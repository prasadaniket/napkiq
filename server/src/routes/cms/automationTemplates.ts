import { Router } from 'express'
import multer from 'multer'
import { requireAuth, requireAdmin } from '../../middleware/auth'
import { readTemplates, updateTemplate } from '../../lib/templateStore'
import { cloudinary } from '../../lib/cloudinary'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

router.use(requireAuth)

// GET /api/cms/automation-templates
// Any authenticated role can read templates
router.get('/', (_req, res) => {
  res.json(Object.values(readTemplates()))
})

// PUT /api/cms/automation-templates/:key
// Admin only — update subject, body, linkUrl, imageUrl, isActive
router.put('/:key', requireAdmin, (req, res, next) => {
  try {
    const key = req.params.key as string
    const { subject, body, linkUrl, imageUrl, isActive } = req.body

    const updates: Parameters<typeof updateTemplate>[1] = {}
    if (subject  !== undefined) updates.subject  = subject
    if (body     !== undefined) updates.body     = body
    if (linkUrl  !== undefined) updates.linkUrl  = linkUrl
    if (imageUrl !== undefined) updates.imageUrl = imageUrl
    if (isActive !== undefined) updates.isActive = isActive

    const updated = updateTemplate(key, updates)
    res.json(updated)
  } catch (err: any) {
    if (err.message?.startsWith('Unknown template')) {
      res.status(404).json({ error: err.message })
      return
    }
    next(err)
  }
})

// POST /api/cms/automation-templates/:key/image
// Upload image from local device to Cloudinary for templates
router.post('/:key/image', requireAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const key = req.params.key as string
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' })
      return
    }

    const templates = readTemplates()
    if (!templates[key]) {
      res.status(404).json({ error: `Unknown template key: ${key}` })
      return
    }

    // Delete old image from Cloudinary if it exists
    const oldUrl = templates[key].imageUrl
    if (oldUrl) {
      try {
        const parts = oldUrl.split('/')
        const uploadIndex = parts.findIndex((p: string) => p === 'upload')
        if (uploadIndex !== -1) {
          const afterUpload = parts.slice(uploadIndex + 1)
          const noVersion = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
          const publicId  = noVersion.join('/').replace(/\.[^.]+$/, '')
          await cloudinary.uploader.destroy(publicId)
        }
      } catch { /* non-fatal */ }
    }

    // Upload new image
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder:          'Napkiq/automation',
          public_id:       `template_${key}`,
          overwrite:       true,
          transformation:  [{ width: 1000, height: 1000, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error('Upload failed'))
          else resolve(result)
        },
      )
      stream.end(req.file!.buffer)
    })

    const updated = updateTemplate(key, { imageUrl: result.secure_url })
    res.json({ imageUrl: updated.imageUrl })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cms/automation-templates/:key/image
// Delete image from template and Cloudinary
router.delete('/:key/image', requireAdmin, async (req, res, next) => {
  try {
    const key = req.params.key as string
    const store = readTemplates()
    const template = store[key]
    if (!template) {
      res.status(404).json({ error: `Unknown template key: ${key}` })
      return
    }

    if (template.imageUrl) {
      try {
        const parts = template.imageUrl.split('/')
        const uploadIndex = parts.findIndex((p: string) => p === 'upload')
        if (uploadIndex !== -1) {
          const afterUpload = parts.slice(uploadIndex + 1)
          const noVersion = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
          const publicId  = noVersion.join('/').replace(/\.[^.]+$/, '')
          await cloudinary.uploader.destroy(publicId)
        }
      } catch { /* non-fatal */ }
    }

    const updated = updateTemplate(key, { imageUrl: null })
    res.json({ imageUrl: updated.imageUrl })
  } catch (err) {
    next(err)
  }
})

export default router
