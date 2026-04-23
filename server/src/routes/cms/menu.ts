import { Router } from 'express'
import multer from 'multer'
import { cloudinary, MENU_FOLDER } from '../../lib/cloudinary'
import { prisma } from '../../lib/prisma'
import { requireAuth, requireAdmin } from '../../middleware/auth'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

router.use(requireAuth, requireAdmin)

// ─── Categories ───────────────────────────────────────────────────────────────

// GET /cms/menu?outletId=...
router.get('/', async (req, res, next) => {
  try {
    const outletId = req.query.outletId as string | undefined

    const categories = await prisma.menuCategory.findMany({
      where: outletId ? { outletId } : {},
      orderBy: { displayOrder: 'asc' },
      include: {
        outlet: { select: { id: true, name: true, code: true } },
        items: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    })

    res.json(categories)
  } catch (err) {
    next(err)
  }
})

// POST /cms/menu/categories
router.post('/categories', async (req, res, next) => {
  try {
    const { name, outletId, displayOrder } = req.body
    if (!name) {
      res.status(400).json({ error: 'Category name is required' })
      return
    }

    const category = await prisma.menuCategory.create({
      data: {
        name,
        outletId:     outletId ?? null,
        displayOrder: displayOrder ?? 0,
        isActive:     true,
      },
    })

    res.status(201).json(category)
  } catch (err) {
    next(err)
  }
})

// PUT /cms/menu/categories/:id
router.put('/categories/:id', async (req, res, next) => {
  try {
    const { name, displayOrder, isActive } = req.body

    const category = await prisma.menuCategory.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined        && { name }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined     && { isActive }),
      },
    })

    res.json(category)
  } catch (err) {
    next(err)
  }
})

// DELETE /cms/menu/categories/:id
router.delete('/categories/:id', async (req, res, next) => {
  try {
    // Soft delete — mark inactive (preserves history)
    await prisma.menuCategory.update({
      where: { id: req.params.id },
      data:  { isActive: false },
    })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// ─── Items ────────────────────────────────────────────────────────────────────

// POST /cms/menu/items
router.post('/items', async (req, res, next) => {
  try {
    const { categoryId, name, description, price, priceVariants, isVeg, isAvailable, displayOrder } = req.body
    if (!categoryId || !name) {
      res.status(400).json({ error: 'categoryId and name are required' })
      return
    }

    const item = await prisma.menuItem.create({
      data: {
        categoryId,
        name,
        description:   description  ?? null,
        price:         price        ?? null,
        priceVariants: priceVariants ?? null,
        isVeg:         isVeg        ?? true,
        isAvailable:   isAvailable  ?? true,
        displayOrder:  displayOrder ?? 0,
      },
    })

    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

// PUT /cms/menu/items/:id
router.put('/items/:id', async (req, res, next) => {
  try {
    const { name, description, price, priceVariants, isVeg, isAvailable, displayOrder, categoryId } = req.body

    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: {
        ...(name          !== undefined && { name }),
        ...(description   !== undefined && { description }),
        ...(price         !== undefined && { price }),
        ...(priceVariants !== undefined && { priceVariants }),
        ...(isVeg         !== undefined && { isVeg }),
        ...(isAvailable   !== undefined && { isAvailable }),
        ...(displayOrder  !== undefined && { displayOrder }),
        ...(categoryId    !== undefined && { categoryId }),
      },
    })

    res.json(item)
  } catch (err) {
    next(err)
  }
})

// DELETE /cms/menu/items/:id
router.delete('/items/:id', async (req, res, next) => {
  try {
    // Delete image from Cloudinary if one exists
    const item = await prisma.menuItem.findUnique({ where: { id: req.params.id } })
    if (item?.imageUrl) {
      try {
        // Extract public_id from the URL
        const parts = item.imageUrl.split('/')
        const uploadIndex = parts.findIndex((p: string) => p === 'upload')
        if (uploadIndex !== -1) {
          const afterUpload = parts.slice(uploadIndex + 1)
          // Skip version segment (v1234567890)
          const noVersion = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
          const publicId  = noVersion.join('/').replace(/\.[^.]+$/, '')
          await cloudinary.uploader.destroy(publicId)
        }
      } catch { /* non-fatal */ }
    }

    await prisma.menuItem.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

// POST /cms/menu/items/:id/image
router.post('/items/:id/image', upload.single('image'), async (req, res, next) => {
  try {
    const id = req.params['id'] as string

    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' })
      return
    }

    const item = await prisma.menuItem.findUnique({ where: { id } })
    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }

    // Delete old image if one exists
    if (item.imageUrl) {
      try {
        const parts       = item.imageUrl.split('/')
        const uploadIndex = parts.findIndex((p: string) => p === 'upload')
        if (uploadIndex !== -1) {
          const afterUpload = parts.slice(uploadIndex + 1)
          const noVersion   = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
          const publicId    = noVersion.join('/').replace(/\.[^.]+$/, '')
          await cloudinary.uploader.destroy(publicId)
        }
      } catch { /* non-fatal */ }
    }

    // Upload new image
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder:          MENU_FOLDER,
          public_id:       `item_${id}`,
          overwrite:       true,
          transformation:  [{ width: 800, height: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error('Upload failed'))
          else resolve(result)
        },
      )
      stream.end(req.file!.buffer)
    })

    const updated = await prisma.menuItem.update({
      where: { id },
      data:  { imageUrl: result.secure_url },
    })

    res.json({ imageUrl: updated.imageUrl })
  } catch (err) {
    next(err)
  }
})

// DELETE /cms/menu/items/:id/image
router.delete('/items/:id/image', async (req, res, next) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: req.params.id } })
    if (!item?.imageUrl) {
      res.status(404).json({ error: 'No image to delete' })
      return
    }

    const parts       = item.imageUrl.split('/')
    const uploadIndex = parts.findIndex((p: string) => p === 'upload')
    if (uploadIndex !== -1) {
      const afterUpload = parts.slice(uploadIndex + 1)
      const noVersion   = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
      const publicId    = noVersion.join('/').replace(/\.[^.]+$/, '')
      await cloudinary.uploader.destroy(publicId)
    }

    await prisma.menuItem.update({
      where: { id: req.params.id },
      data:  { imageUrl: null },
    })

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
