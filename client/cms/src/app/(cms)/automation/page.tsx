'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import type { AutomationTemplate, PageResponse } from '@/types/api'
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Zap, 
  Clock, 
  Settings, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  FileText, 
  History, 
  User, 
  Phone, 
  ArrowUpRight, 
  HelpCircle,
  Play, 
  RefreshCw, 
  Layers, 
  Check, 
  ChevronRight,
  Filter,
  X,
  Cake,
  Heart,
  UserPlus,
  Tag,
  Megaphone,
  AlertTriangle,
  ImageIcon,
  UploadCloud,
  Trash2,
  Loader2
} from 'lucide-react'

// ─── Types & Configuration ───────────────────────────────────────────────────

interface AutomationLog {
  id:             string
  customer:       { fullName: string; phone: string }
  automationType: string
  messageStage:   string
  status:         'success' | 'failed'
  sentAt:         string
  errorMessage:   string | null
}

type TriggerKey = 'reengagement' | 'welcome' | 'promotional' | 'announcement'

const TYPE_LABEL: Record<string, string> = {
  birthday_whatsapp:     'Birthday · WhatsApp',
  birthday_email:        'Birthday · Email',
  anniversary_whatsapp:  'Anniversary · WhatsApp',
  anniversary_email:     'Anniversary · Email',
  reengagement_whatsapp: 'Re-engagement · WhatsApp',
  reengagement_email:    'Re-engagement · Email',
  welcome_whatsapp:      'Welcome · WhatsApp',
  welcome_email:         'Welcome · Email',
  promotional_whatsapp:  'Promotional · WhatsApp',
  promotional_email:     'Promotional · Email',
  announcement_whatsapp: 'Announcement · WhatsApp',
  announcement_email:    'Announcement · Email',
  bounceback_whatsapp:   'Bounce-back · WhatsApp',
  bounceback_email:      'Bounce-back · Email',
}

const GROUP_ORDER = [
  'Birthday', 'Anniversary', 'Re-engagement', 'Welcome', 'Bounce-back Campaign', 'Promotional Offer', 'Product Announcement',
]

const GROUP_ICONS: Record<string, any> = {
  'Birthday': Cake,
  'Anniversary': Heart,
  'Re-engagement': RefreshCw,
  'Welcome': UserPlus,
  'Bounce-back Campaign': Clock,
  'Promotional Offer': Tag,
  'Product Announcement': Megaphone,
}

const TRIGGERS: { key: TriggerKey; icon: any; label: string; desc: string; color: string; bg: string }[] = [
  { key: 'reengagement', icon: RefreshCw, label: 'Re-engagement', desc: '30d inactive',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { key: 'welcome',      icon: UserPlus,  label: 'Welcome',       desc: 'First-timers',  color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { key: 'promotional',  icon: Tag,       label: 'Promotional',   desc: 'All active',    color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  { key: 'announcement', icon: Megaphone, label: 'Announcement',  desc: 'All customers', color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
]

// Helper to replace placeholders dynamically for rendering mockup previews
const replaceMockPlaceholders = (text: string) => {
  if (!text) return ''
  return text
    .replace(/{customer_name}/g, 'Alex')
    .replace(/{name}/g, 'Alex')
    .replace(/{outlet_name}/g, 'Stone Oven Boisar')
    .replace(/{outlet_code}/g, 'BSR')
}

// ─── Custom UI Switch ────────────────────────────────────────────────────────

function FormSwitch({ on, onChange, label }: { on: boolean; onChange: () => void; label?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div 
        onClick={onChange} 
        className="relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner flex-shrink-0"
        style={{
          background: on ? 'var(--color-success)' : 'rgba(0, 2, 29, 0.08)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
        }}
      >
        <div 
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md"
          style={{
            transform: on ? 'translateX(20px)' : 'translateX(0)',
          }}
        />
      </div>
      {label && <span className="text-xs font-semibold text-neutral-medium">{label}</span>}
    </label>
  )
}

// ─── Unified Campaign Card Component ─────────────────────────────────────────

function CampaignGroupCard({
  group,
  templates,
  isAdmin,
  onSave,
  onImageUpdate
}: {
  group: string
  templates: AutomationTemplate[]
  isAdmin: boolean
  onSave: (key: string, patch: Partial<AutomationTemplate>) => Promise<void>
  onImageUpdate: (key: string, imageUrl: string | null) => void
}) {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email'>('whatsapp')
  
  // Find templates for WhatsApp and Email
  const waTemplate = templates.find(t => t.channel === 'whatsapp')
  const emailTemplate = templates.find(t => t.channel === 'email')
  
  // States for drafts
  const [waDraft, setWaDraft] = useState<AutomationTemplate | null>(null)
  const [emailDraft, setEmailDraft] = useState<AutomationTemplate | null>(null)
  
  const [waDirty, setWaDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, channel: 'whatsapp' | 'email') => {
    const file = e.target.files?.[0]
    if (!file) return

    const draft = channel === 'whatsapp' ? waDraft : emailDraft
    if (!draft) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size exceeds 5MB limit')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await api.post<{ imageUrl: string }>(`/cms/automation-templates/${draft.key}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onImageUpdate(draft.key, res.data.imageUrl)
      handleUpdateField(channel, 'imageUrl', res.data.imageUrl)
      toast.success('Image uploaded successfully')
    } catch (err: any) {
      toast.error('Failed to upload image')
      console.error(err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDeleteImage = async (channel: 'whatsapp' | 'email') => {
    const draft = channel === 'whatsapp' ? waDraft : emailDraft
    if (!draft) return

    setUploading(true)
    try {
      await api.delete<{ imageUrl: string | null }>(`/cms/automation-templates/${draft.key}/image`)
      onImageUpdate(draft.key, null)
      handleUpdateField(channel, 'imageUrl', null)
      toast.success('Image removed successfully')
    } catch (err) {
      toast.error('Failed to delete image')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  // Load templates into drafts
  useEffect(() => {
    if (waTemplate) {
      setWaDraft({ ...waTemplate })
      setWaDirty(false)
    }
  }, [waTemplate])

  useEffect(() => {
    if (emailTemplate) {
      setEmailDraft({ ...emailTemplate })
      setEmailDirty(false)
    }
  }, [emailTemplate])

  // Sync active channel based on what templates are present
  useEffect(() => {
    if (!waTemplate && emailTemplate) {
      setActiveChannel('email')
    }
  }, [waTemplate, emailTemplate])

  const handleUpdateField = (channel: 'whatsapp' | 'email', field: keyof AutomationTemplate, value: any) => {
    if (channel === 'whatsapp' && waDraft) {
      setWaDraft(prev => prev ? ({ ...prev, [field]: value }) : null)
      setWaDirty(true)
    } else if (channel === 'email' && emailDraft) {
      setEmailDraft(prev => prev ? ({ ...prev, [field]: value }) : null)
      setEmailDirty(true)
    }
  }

  const handleSaveDraft = async (channel: 'whatsapp' | 'email') => {
    const draft = channel === 'whatsapp' ? waDraft : emailDraft
    if (!draft) return

    setSaving(true)
    try {
      await onSave(draft.key, {
        subject: draft.subject,
        body: draft.body,
        linkUrl: draft.linkUrl,
        imageUrl: draft.imageUrl,
        isActive: draft.isActive
      })
      if (channel === 'whatsapp') setWaDirty(false)
      else setEmailDirty(false)
    } catch {
      // Toast error is handled inside parent onSave
    } finally {
      setSaving(false)
    }
  }

  const handleInsertTag = (channel: 'whatsapp' | 'email', tag: string) => {
    if (!isAdmin) return
    const draft = channel === 'whatsapp' ? waDraft : emailDraft
    if (!draft) return
    
    const currentBody = draft.body ?? ''
    handleUpdateField(channel, 'body', currentBody + tag)
  }

  const activeDraft = activeChannel === 'whatsapp' ? waDraft : emailDraft
  const isDirty = activeChannel === 'whatsapp' ? waDirty : emailDirty
  const originalTemplate = activeChannel === 'whatsapp' ? waTemplate : emailTemplate

  if (!waTemplate && !emailTemplate) return null

  const IconComp = GROUP_ICONS[group] ?? Sparkles

  return (
    <div className="campaign-card">
      {/* Card Header */}
      <div className="campaign-card-header">
        <div className="flex items-center gap-3">
          <div className="campaign-card-icon-wrapper">
            <IconComp size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="campaign-card-title">{group}</h3>
            <p className="campaign-card-subtitle">{originalTemplate?.triggerDesc ?? 'Scheduled execution'}</p>
          </div>
        </div>
        
        {/* Toggle details badge */}
        <div className="flex items-center gap-2">
          {templates.some(t => t.isActive) ? (
            <span className="channel-badge-active">
              <span className="pulse-indicator-green" />
              Active
            </span>
          ) : (
            <span className="channel-badge-inactive">Inactive</span>
          )}
        </div>
      </div>

      {/* Segment Tabs inside the card */}
      <div className="card-channel-tabs">
        {waTemplate && (
          <button 
            className={`card-channel-tab ${activeChannel === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveChannel('whatsapp')}
          >
            <MessageSquare size={13} style={{ color: activeChannel === 'whatsapp' ? '#25d366' : 'inherit' }} />
            WhatsApp
            {waDraft?.isActive && <span className="channel-dot" style={{ background: '#25d366' }} />}
          </button>
        )}
        {emailTemplate && (
          <button 
            className={`card-channel-tab ${activeChannel === 'email' ? 'active' : ''}`}
            onClick={() => setActiveChannel('email')}
          >
            <Mail size={13} style={{ color: activeChannel === 'email' ? 'var(--color-primary)' : 'inherit' }} />
            Email
            {emailDraft?.isActive && <span className="channel-dot" style={{ background: 'var(--color-primary)' }} />}
          </button>
        )}
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="campaign-workspace">
        {activeDraft ? (
          <div className="campaign-editor-panel">
            {/* Active Toggle Switch */}
            <div className="flex justify-between items-center py-2 px-4 rounded-xl border border-dashed border-neutral-light bg-neutral-light/5 mb-4">
              <span className="text-xs font-semibold text-neutral-medium">Channel Delivery Status</span>
              <FormSwitch 
                on={activeDraft.isActive} 
                onChange={() => handleUpdateField(activeChannel, 'isActive', !activeDraft.isActive)}
                label={activeDraft.isActive ? 'Active' : 'Inactive'}
              />
            </div>

            {/* Email Subject Line */}
            {activeChannel === 'email' && (
              <div className="form-group mb-4">
                <label className="field-label">Email Subject Line</label>
                <div className="input-with-icon">
                  <Mail size={14} className="input-icon text-neutral-medium" />
                  <input 
                    className="input pl-9" 
                    value={activeDraft.subject ?? ''} 
                    onChange={e => handleUpdateField('email', 'subject', e.target.value || null)}
                    placeholder="Enter email subject line…" 
                    disabled={!isAdmin}
                  />
                </div>
              </div>
            )}

            {/* Message Body Field */}
            <div className="form-group mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="field-label m-0">Message Content</label>
                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-neutral-medium uppercase tracking-wide">Insert:</span>
                    <button 
                      type="button" 
                      onClick={() => handleInsertTag(activeChannel, '{customer_name}')}
                      className="placeholder-tag-btn"
                    >
                      Name
                    </button>
                  </div>
                )}
              </div>
              <textarea 
                className="input textarea-editor" 
                value={activeDraft.body} 
                onChange={e => handleUpdateField(activeChannel, 'body', e.target.value)}
                rows={5} 
                placeholder="Compose your marketing automation message here…"
                disabled={!isAdmin}
              />
            </div>

            {/* Redirection Link URL */}
            <div className="form-group mb-4">
              <label className="field-label">Action Redirection URL (Optional)</label>
              <div className="input-with-icon">
                <ArrowUpRight size={14} className="input-icon text-neutral-medium" />
                <input 
                  className="input pl-9" 
                  value={activeDraft.linkUrl ?? ''} 
                  onChange={e => handleUpdateField(activeChannel, 'linkUrl', e.target.value || null)}
                  placeholder="https://napkiq.com/menu" 
                  disabled={!isAdmin}
                />
              </div>
            </div>

            {/* Attached Image Uploader */}
            <div className="form-group">
              <label className="field-label">Campaign Attachment Image</label>
              
              {activeDraft.imageUrl ? (
                /* Uploaded Image Preview & Actions */
                <div className="relative rounded-2xl overflow-hidden border border-neutral-light bg-neutral-light/5 p-3 flex items-center gap-4 group/upload">
                  <img 
                    src={activeDraft.imageUrl} 
                    alt="Attached banner" 
                    className="h-16 w-24 object-cover rounded-xl border border-neutral-light shadow-sm bg-white"
                  />
                  <div className="flex-1">
                    <span className="text-[11px] font-bold text-neutral-medium uppercase tracking-wide">Image attached</span>
                    <div className="flex gap-2 mt-1.5">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="btn-ghost py-1 px-3 text-xs gap-1.5 rounded-full"
                      >
                        <RefreshCw size={11} className={uploading ? 'animate-spin' : ''} />
                        Replace
                      </button>
                      {isAdmin && (
                        <button 
                          type="button" 
                          onClick={() => handleDeleteImage(activeChannel)}
                          disabled={uploading}
                          className="btn-ghost py-1 px-3 text-xs gap-1.5 rounded-full text-danger border-danger/20 hover:bg-danger/5"
                        >
                          <Trash2 size={11} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Drag & Drop Upload Trigger Box */
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl border-2 border-dashed border-neutral-light hover:border-primary/45 hover:bg-primary-dim/15 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer group/uploader"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-light/10 text-neutral-medium flex items-center justify-center group-hover/uploader:scale-105 group-hover/uploader:text-primary transition-all duration-300">
                    {uploading ? (
                      <Loader2 size={20} className="animate-spin text-primary" />
                    ) : (
                      <UploadCloud size={20} />
                    )}
                  </div>
                  <span className="text-xs font-bold text-neutral-bold mt-2.5">
                    {uploading ? 'Uploading campaign image…' : 'Upload Campaign Image'}
                  </span>
                  <span className="text-[10px] text-neutral-medium mt-1">
                    PNG, JPG, or JPEG up to 5MB supported
                  </span>
                </div>
              )}
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => handleFileChange(e, activeChannel)}
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            {/* Save panel */}
            {isAdmin && (
              <div className={`save-action-panel ${isDirty ? 'show' : ''}`}>
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-warning animate-pulse" />
                  <span className="text-xs text-neutral-medium font-semibold">Unsaved edits made</span>
                </div>
                <button 
                  onClick={() => handleSaveDraft(activeChannel)}
                  disabled={saving || !isDirty}
                  className="btn-primary py-1.5 px-4 text-xs font-bold gap-1.5 shadow-md shadow-primary/10 rounded-full"
                >
                  <Save size={12} />
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-neutral-medium">
            <AlertCircle size={24} className="mb-2 opacity-50" />
            <p className="text-xs font-medium">Channel template not found</p>
          </div>
        )}

        {/* Live Mockup Preview Column */}
        <div className="campaign-preview-panel">
          <div className="preview-header-label">
            <Sparkles size={11} className="text-[#f59e0b]" />
            Live Preview (Mockup)
          </div>
          
          {activeChannel === 'whatsapp' ? (
            /* WhatsApp Phone Mockup */
            <div className="whatsapp-phone-mockup">
              <div className="phone-screen">
                {/* Phone Header */}
                <div className="phone-chat-header">
                  <div className="chat-avatar">NQ</div>
                  <div className="chat-info">
                    <span className="chat-name">Napkiq</span>
                    <span className="chat-status">Online · Pizza &amp; Cafe</span>
                  </div>
                </div>
                {/* Chat Body */}
                <div className="chat-messages-container">
                  <div className="wa-message-bubble">
                    {activeDraft?.imageUrl && (
                      <div className="wa-bubble-img-wrap mb-1.5" style={{ overflow: 'hidden', borderRadius: '4px' }}>
                        <img 
                          src={activeDraft.imageUrl} 
                          alt="Campaign attachment" 
                          className="w-full h-24 object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <p className="wa-message-text">
                      {replaceMockPlaceholders(activeDraft?.body ?? '') || 'Hi Alex, welcome to Napkiq! Enjoy artisanal stone-baked goodness.'}
                    </p>
                    
                    {activeDraft?.linkUrl && (
                      <a href={activeDraft.linkUrl} target="_blank" rel="noopener noreferrer" className="wa-message-link-card">
                        <div className="flex items-center justify-between gap-2">
                          <span className="wa-link-text truncate">{activeDraft.linkUrl}</span>
                          <ArrowRight size={10} className="text-neutral-medium" />
                        </div>
                      </a>
                    )}

                    <div className="wa-message-footer">
                      <span>{format(new Date(), 'HH:mm')}</span>
                      <span className="wa-ticks">✓✓</span>
                    </div>
                  </div>
                  
                  {activeDraft?.linkUrl && (
                    <div className="wa-action-button-mock">
                      <ArrowUpRight size={12} />
                      Open Action Link
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Email Client Mockup */
            <div className="email-client-mockup">
              <div className="email-header-fields">
                <div className="email-field">
                  <span className="label">From:</span>
                  <span className="val">Napkiq &lt;info@napkiq.com&gt;</span>
                </div>
                <div className="email-field">
                  <span className="label">To:</span>
                  <span className="val">Alex &lt;customer@napkiq.com&gt;</span>
                </div>
                <div className="email-field">
                  <span className="label">Subject:</span>
                  <span className="val text-neutral-bold truncate">
                    {replaceMockPlaceholders(activeDraft?.subject ?? '') || 'Exclusive Treat Awaits You at Napkiq!'}
                  </span>
                </div>
              </div>
              <div className="email-body-content">
                <div className="email-brand-banner">
                  Napkiq
                </div>
                {activeDraft?.imageUrl && (
                  <div className="email-hero-img-wrap mb-4">
                    <img 
                      src={activeDraft.imageUrl} 
                      alt="Campaign hero banner" 
                      className="w-full h-32 object-cover rounded-lg border border-neutral-light/40"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className="email-text">
                  {replaceMockPlaceholders(activeDraft?.body ?? '') || 'We look forward to sharing authentic woodfired goodness with you.'}
                </p>
                {activeDraft?.linkUrl && (
                  <div className="text-center py-4">
                    <a href={activeDraft.linkUrl} target="_blank" rel="noopener noreferrer" className="email-cta-btn">
                      Visit Napkiq Menu
                    </a>
                  </div>
                )}
                <div className="email-footer-brand">
                  © {new Date().getFullYear()} Napkiq Restaurant &amp; Cafe. All rights reserved.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard Stats & Trigger Console ───────────────────────────────────────

function DashboardTriggerConsole({ 
  isAdmin, 
  triggering, 
  onTrigger 
}: { 
  isAdmin: boolean
  triggering: TriggerKey | null
  onTrigger: (type: TriggerKey) => void 
}) {
  return (
    <div className="trigger-console-container">
      <div className="trigger-console-header">
        <Zap size={18} className="text-[#f59e0b]" />
        <div>
          <h2 className="trigger-console-title">Instant Campaign Trigger Console</h2>
          <p className="trigger-console-subtitle">Dispatch automated campaigns instantly to highly targeted segments</p>
        </div>
      </div>
      
      {isAdmin ? (
        <div className="trigger-grid">
          {TRIGGERS.map(t => {
            const IconComp = t.icon
            const isBusy = triggering === t.key
            
            return (
              <button 
                key={t.key} 
                onClick={() => onTrigger(t.key)} 
                disabled={triggering !== null}
                className="trigger-console-btn"
                style={{
                  '--hover-glow': t.color,
                  '--accent-bg': t.bg,
                } as any}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="trigger-btn-icon-bg" style={{ color: t.color }}>
                    {isBusy ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <IconComp size={18} />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="trigger-btn-label">{isBusy ? 'Processing…' : t.label}</div>
                    <div className="trigger-btn-desc">{t.desc}</div>
                  </div>
                </div>
                <div className="trigger-btn-arrow">
                  <Play size={10} fill="currentColor" />
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#ef4444]/20 bg-[#ef4444]/5 text-neutral-medium text-sm">
          <AlertTriangle size={18} className="text-[#ef4444]" />
          <span>Quick campaigns and database triggers are locked. Administrative credentials are required to dispatch broadcasts.</span>
        </div>
      )}
    </div>
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function AutomationPage() {
  const { isAdmin } = useAuth()

  const [templates, setTemplates]   = useState<AutomationTemplate[]>([])
  const [logs, setLogs]             = useState<AutomationLog[]>([])
  const [loadingT, setLoadingT]     = useState(true)
  const [loadingL, setLoadingL]     = useState(true)
  const [activeTab, setActiveTab]   = useState<'templates' | 'logs'>('templates')
  const [triggering, setTriggering] = useState<TriggerKey | null>(null)

  // Advanced Log Filters & Pagination
  const [logSearch, setLogSearch]   = useState('')
  const [logStatus, setLogStatus]   = useState<'all' | 'success' | 'failed'>('all')
  const [logType, setLogType]       = useState('all')

  const fetchTemplates = useCallback(() =>
    api.get<AutomationTemplate[]>('/cms/automation-templates')
      .then(r => setTemplates(r.data))
      .catch(() => toast.error('Failed to load templates'))
      .finally(() => setLoadingT(false))
  , [])

  const fetchLogs = useCallback(() =>
    api.get<PageResponse<AutomationLog>>('/cms/automation-logs?page=0&size=100')
      .then(r => setLogs(r.data.content))
      .catch(() => setLogs([]))
      .finally(() => setLoadingL(false))
  , [])

  useEffect(() => { 
    fetchTemplates()
    fetchLogs() 
  }, [fetchTemplates, fetchLogs])

  const handleSave = async (key: string, patch: Partial<AutomationTemplate>) => {
    try {
      const res = await api.put<AutomationTemplate>(`/cms/automation-templates/${key}`, patch)
      setTemplates(prev => prev.map(t => t.key === key ? res.data : t))
      toast.success('Template saved successfully')
    } catch {
      toast.error('Failed to save template edits')
      throw new Error('save failed')
    }
  }

  const handleImageUpdate = (key: string, imageUrl: string | null) => {
    setTemplates(prev => prev.map(t => t.key === key ? { ...t, imageUrl } : t))
  }

  const trigger = async (type: TriggerKey) => {
    setTriggering(type)
    try {
      const res = await api.post<{ customers: number; sent: number; skipped: number; failed: number }>(`/automation/${type}`)
      const { customers, sent, skipped, failed } = res.data
      toast.success(`Dispatched — ${sent} sent · ${skipped} skipped · ${failed} failed (${customers} matched)`)
      await fetchLogs()
      setActiveTab('logs')
    } catch {
      toast.error(`Failed to trigger instant ${type} campaign`)
    } finally { 
      setTriggering(null) 
    }
  }

  const grouped: Record<string, AutomationTemplate[]> = {}
  for (const g of GROUP_ORDER) grouped[g] = []
  for (const t of templates) {
    if (!grouped[t.label]) grouped[t.label] = []
    grouped[t.label].push(t)
  }

  // Filtered Logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = !logSearch || 
      log.customer?.fullName.toLowerCase().includes(logSearch.toLowerCase()) || 
      log.customer?.phone.includes(logSearch)
      
    const matchesStatus = logStatus === 'all' || 
      (logStatus === 'success' && log.status === 'success') || 
      (logStatus === 'failed' && log.status === 'failed')
      
    const matchesType = logType === 'all' || 
      log.automationType.toLowerCase().startsWith(logType.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  // Extract unique campaign types for logs filter
  const logTypes = Array.from(new Set(logs.map(l => l.automationType.split('_')[0])))

  return (
    <div className="automation-page-workspace">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden rounded-[24px] bg-[#efeeeb] border border-neutral-light/50 p-8 mb-8">
        {/* Abstract background blobs */}
        <div className="absolute top-[-50%] right-[-10%] w-[320px] h-[320px] bg-primary/5 rounded-full blur-[80px]" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="page-title text-3xl font-bold flex items-center gap-3">
              <Layers className="text-primary" size={24} />
              Marketing &amp; Automation
            </h1>
            <p className="page-subtitle text-sm mt-1.5 text-neutral-medium max-w-xl">
              Construct high-fidelity messaging templates for WhatsApp and email channels. Drive engagement with automatic daily scheduling or dispatch immediate targeted broadcasts.
            </p>
          </div>
          <span className="role-badge role-badge-admin uppercase text-xs tracking-wider font-extrabold px-4 py-2 border border-primary/20 shadow-sm flex-shrink-0 self-start md:self-auto">
            ADMIN ONLY
          </span>
        </div>
      </div>

      <div className="page-content px-0">
        {/* Info Notification Panel */}
        <div className="info-banner-panel mb-8">
          <div className="banner-icon-bg">
            <Zap size={16} className="text-[#f59e0b]" />
          </div>
          <div className="banner-text">
            <p className="m-0">
              <strong>Automated Execution:</strong> Background daily triggers execute seamlessly via Cloudflare Workers. 
              <strong> Broadcasts:</strong> Use the Campaign Console below for on-demand dispatch. 
              WhatsApp templates require Meta approval status — toggle to <em>Active</em> once approved in your Meta Dashboard.
            </p>
          </div>
        </div>

        {/* Dashboard Console Block */}
        <div className="mb-8">
          <DashboardTriggerConsole 
            isAdmin={isAdmin}
            triggering={triggering}
            onTrigger={trigger}
          />
        </div>

        {/* Tab Controls Bar */}
        <div className="tab-menu-bar mb-8">
          <button 
            className={`tab-menu-item ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <FileText size={15} />
            <span>Campaign Templates</span>
          </button>
          
          <button 
            className={`tab-menu-item ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <History size={15} />
            <span>Transmission Logs</span>
            {logs.length > 0 && (
              <span className="tab-badge">{logs.length}</span>
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="tab-content-area">
          
          {/* Templates Section */}
          {activeTab === 'templates' && (
            <div className="space-y-8">
              {loadingT ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-1 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="campaign-card animate-pulse opacity-60">
                      <div className="campaign-card-header h-12 bg-neutral-light/20 rounded-t-2xl" />
                      <div className="p-6 space-y-4">
                        <div className="h-6 w-1/4 bg-neutral-light/20 rounded" />
                        <div className="h-28 bg-neutral-light/10 rounded-xl" />
                        <div className="h-10 w-1/3 bg-neutral-light/20 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                GROUP_ORDER.map(group => {
                  const groupTemplates = grouped[group]
                  if (!groupTemplates || groupTemplates.length === 0) return null

                  return (
                    <CampaignGroupCard 
                      key={group}
                      group={group}
                      templates={groupTemplates}
                      isAdmin={isAdmin}
                      onSave={handleSave}
                      onImageUpdate={handleImageUpdate}
                    />
                  )
                })
              )}
            </div>
          )}

          {/* Logs Section */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              {/* Logs Search & Filter Console */}
              <div className="logs-filter-console">
                <div className="search-bar-wrap">
                  <Search size={14} className="search-icon" />
                  <input 
                    className="input pl-9" 
                    placeholder="Search logs by customer name, phone number…" 
                    value={logSearch}
                    onChange={e => setLogSearch(e.target.value)}
                  />
                  {logSearch && (
                    <button onClick={() => setLogSearch('')} className="clear-search-btn">
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="filters-group">
                  <div className="filter-select-wrap">
                    <Filter size={12} className="select-icon" />
                    <select 
                      className="input py-1.5 pl-8 pr-8 text-xs font-semibold"
                      value={logStatus}
                      onChange={e => setLogStatus(e.target.value as any)}
                    >
                      <option value="all">All Delivery States</option>
                      <option value="success">Successful Transfers</option>
                      <option value="failed">Failed / Bounced</option>
                    </select>
                  </div>

                  <div className="filter-select-wrap">
                    <Layers size={12} className="select-icon" />
                    <select 
                      className="input py-1.5 pl-8 pr-8 text-xs font-semibold"
                      value={logType}
                      onChange={e => setLogType(e.target.value)}
                    >
                      <option value="all">All Campaign Types</option>
                      {logTypes.map(t => (
                        <option key={t} value={t}>
                          {t.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {(logSearch || logStatus !== 'all' || logType !== 'all') && (
                    <button 
                      onClick={() => { setLogSearch(''); setLogStatus('all'); setLogType('all') }}
                      className="btn-ghost py-1 px-3 text-xs gap-1 hover:text-primary rounded-full"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {loadingL ? (
                /* Skeleton logs */
                <div className="space-y-2.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-14 bg-neutral-light/10 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="empty-state bg-white border border-neutral-light/50 rounded-3xl p-16">
                  <div className="empty-state-icon text-3xl">📜</div>
                  <div className="empty-state-title text-base font-bold mt-3">No matching transmission logs</div>
                  <div className="empty-state-desc text-xs text-neutral-medium mt-1">We couldn't locate any logs corresponding to your specified search query and filters.</div>
                </div>
              ) : (
                /* Premium styled logs list */
                <div className="data-table-wrap rounded-3xl border border-neutral-light/80 shadow-sm overflow-hidden">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Recipient Details</th>
                        <th>Campaign Channel</th>
                        <th>Target Event Stage</th>
                        <th>Delivery Status</th>
                        <th>Sent Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map(log => (
                        <tr key={log.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="initials-circle">
                                {log.customer?.fullName?.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'C'}
                              </div>
                              <div>
                                <div className="font-bold text-neutral-bold text-sm">{log.customer?.fullName}</div>
                                <div className="text-xs text-neutral-medium flex items-center gap-1 mt-0.5">
                                  <Phone size={10} />
                                  {log.customer?.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              {log.automationType.includes('whatsapp') ? (
                                <span className="channel-delivery-tag wa">
                                  <MessageSquare size={10} />
                                  WhatsApp
                                </span>
                              ) : (
                                <span className="channel-delivery-tag email">
                                  <Mail size={10} />
                                  Email
                                </span>
                              )}
                              <span className="text-xs font-semibold text-neutral-dark">
                                {TYPE_LABEL[log.automationType]?.split(' · ')[0] || log.automationType}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="text-xs font-medium text-neutral-bold">
                              {log.messageStage}
                            </span>
                          </td>
                          <td>
                            {log.status === 'success' ? (
                              <span className="delivery-status-badge success">
                                <span className="pulse-dot green" />
                                Dispatched
                              </span>
                            ) : (
                              <div className="group relative inline-block">
                                <span className="delivery-status-badge failure cursor-help">
                                  <span className="pulse-dot red" />
                                  Failed
                                </span>
                                {log.errorMessage && (
                                  <div className="tooltip-message">
                                    {log.errorMessage}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="text-xs text-neutral-medium font-medium">
                              {format(new Date(log.sentAt), 'dd MMM yyyy, HH:mm')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── High-Fidelity Custom Styles Block ── */}
      <style>{`
        .automation-page-workspace {
          --color-border: rgba(0, 2, 29, 0.08);
          --color-success: #10b981;
          --color-success-bg: rgba(16, 185, 129, 0.08);
          --color-danger-bg: rgba(239, 68, 68, 0.08);
          --color-warning: #f59e0b;
          --color-text-3: rgba(0, 2, 29, 0.4);
          font-family: var(--font-sans), sans-serif;
        }

        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .flex-1 { flex: 1; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .m-0 { margin: 0; }
        .mb-1.5 { margin-bottom: 0.375rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .pl-8 { padding-left: 2rem; }
        .pl-9 { padding-left: 2.25rem; }
        .py-1.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
        .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        
        /* ── Page Header & Info Banner ── */
        .info-banner-panel {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          padding: 1rem 1.25rem;
          background: rgba(214, 66, 56, 0.03);
          border: 1px solid rgba(214, 66, 56, 0.12);
          border-radius: var(--radius-lg);
        }
        .banner-icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.1);
          flex-shrink: 0;
        }
        .banner-text p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--color-text-2);
          line-height: 1.55;
        }

        /* ── Tab Menu ── */
        .tab-menu-bar {
          display: flex;
          gap: 0.35rem;
          border-bottom: 1.5px solid var(--color-border);
          padding-bottom: 0px;
        }
        .tab-menu-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-3);
          background: transparent;
          border: none;
          border-bottom: 2.5px solid transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-bottom: -1.5px;
        }
        .tab-menu-item:hover {
          color: var(--color-text-2);
        }
        .tab-menu-item.active {
          color: var(--color-text-1);
          border-bottom-color: var(--color-primary);
        }
        .tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.5px 6px;
          font-size: 9.5px;
          font-weight: 700;
          color: white;
          background: var(--color-primary);
          border-radius: 99px;
          margin-left: 4px;
        }

        /* ── Trigger Console ── */
        .trigger-console-container {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 2, 29, 0.015);
        }
        .trigger-console-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .trigger-console-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-1);
          margin: 0;
        }
        .trigger-console-subtitle {
          font-size: 0.75rem;
          color: var(--color-text-3);
          margin: 0.15rem 0 0 0;
        }
        .trigger-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.75rem;
        }
        .trigger-console-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-lg);
          background: var(--color-surface-2);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          position: relative;
        }
        .trigger-console-btn:hover {
          background: #ffffff;
          border-color: var(--hover-glow);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04), 0 0 12px var(--accent-bg);
          transform: translateY(-2px);
        }
        .trigger-console-btn:active {
          transform: translateY(0);
        }
        .trigger-btn-icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md);
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 2, 29, 0.04);
          transition: transform 0.3s;
        }
        .trigger-console-btn:hover .trigger-btn-icon-bg {
          transform: scale(1.05);
        }
        .trigger-btn-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-1);
          line-height: 1;
        }
        .trigger-btn-desc {
          font-size: 0.7rem;
          color: var(--color-text-3);
          margin-top: 3px;
        }
        .trigger-btn-arrow {
          font-size: 10px;
          color: var(--color-text-3);
          opacity: 0.6;
          transition: all 0.3s;
        }
        .trigger-console-btn:hover .trigger-btn-arrow {
          transform: translateX(3px);
          opacity: 1;
          color: var(--hover-glow);
        }

        /* ── Campaign Card ── */
        .campaign-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: 0 4px 20px rgba(0, 2, 29, 0.012);
          overflow: hidden;
        }
        .campaign-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.15rem 1.5rem;
          border-bottom: 1.5px solid var(--color-border);
          background: var(--color-surface-2);
        }
        .campaign-card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          color: var(--color-primary);
        }
        .campaign-card-title {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-text-1);
          margin: 0;
        }
        .campaign-card-subtitle {
          font-size: 0.72rem;
          color: var(--color-text-3);
          margin: 0.15rem 0 0 0;
          font-weight: 500;
        }
        .channel-badge-active {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 99px;
          font-size: 10px;
          font-weight: 700;
          background: var(--color-success-bg);
          color: var(--color-success);
        }
        .pulse-indicator-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-success);
          animation: status-pulse 1.8s infinite;
        }
        .channel-badge-inactive {
          padding: 3px 10px;
          border-radius: 99px;
          font-size: 10px;
          font-weight: 700;
          background: rgba(0, 2, 29, 0.04);
          color: var(--color-text-3);
        }

        /* ── Sub Tabs inside card ── */
        .card-channel-tabs {
          display: flex;
          padding: 8px 12px 0 12px;
          background: var(--color-surface-2);
          border-bottom: 1px solid var(--color-border);
          gap: 4px;
        }
        .card-channel-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-3);
          background: transparent;
          border: none;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        .card-channel-tab:hover {
          color: var(--color-text-2);
          background: rgba(255,255,255,0.4);
        }
        .card-channel-tab.active {
          color: var(--color-text-1);
          background: #ffffff;
          box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.015);
        }
        .channel-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          position: absolute;
          top: 6px;
          right: 8px;
        }

        /* ── Workspace ── */
        .campaign-workspace {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
        }
        @media (max-width: 992px) {
          .campaign-workspace {
            grid-template-columns: 1fr;
          }
        }
        .campaign-editor-panel {
          padding: 1.5rem;
          border-right: 1.5px solid var(--color-border);
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 992px) {
          .campaign-editor-panel {
            border-right: none;
            border-bottom: 1.5px solid var(--color-border);
          }
        }
        
        .field-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text-2);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.35rem;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          pointer-events: none;
        }
        .placeholder-tag-btn {
          border: 1px solid var(--color-border);
          background: rgba(0, 2, 29, 0.03);
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-2);
          padding: 2px 8px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .placeholder-tag-btn:hover {
          background: var(--color-primary-dim);
          border-color: var(--color-primary-border);
          color: var(--color-primary);
        }
        .textarea-editor {
          font-family: inherit;
          line-height: 1.6;
          font-size: 0.85rem;
        }

        /* Save Panel */
        .save-action-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          background: rgba(245, 158, 11, 0.03);
          border: 1px solid rgba(245, 158, 11, 0.15);
          margin-top: 1.5rem;
          transform: translateY(10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .save-action-panel.show {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* ── Previews ── */
        .campaign-preview-panel {
          padding: 1.5rem;
          background: #fafaf9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }
        .preview-header-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-text-3);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
          align-self: flex-start;
        }

        /* WhatsApp Mockup */
        .whatsapp-phone-mockup {
          width: 100%;
          max-width: 260px;
          aspect-ratio: 9/16;
          border-radius: 36px;
          background: #111;
          padding: 8px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0,0,0,0.1);
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          background: #efeae2;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
          position: relative;
        }
        .phone-chat-header {
          background: #075e54;
          padding: 12px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
        }
        .chat-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ece5dd;
          color: #075e54;
          font-weight: 800;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-info {
          display: flex;
          flex-direction: column;
        }
        .chat-name {
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1;
        }
        .chat-status {
          font-size: 0.52rem;
          opacity: 0.75;
          margin-top: 1.5px;
        }
        .chat-messages-container {
          flex: 1;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 6px;
        }
        .wa-message-bubble {
          background: #d9fdd3;
          border-radius: 8px;
          padding: 6px 8px;
          max-width: 90%;
          align-self: flex-start;
          box-shadow: 0 1px 1px rgba(0,0,0,0.06);
          position: relative;
        }
        .wa-message-text {
          font-size: 0.65rem;
          color: #111111;
          margin: 0;
          line-height: 1.4;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .wa-message-link-card {
          display: block;
          margin-top: 5px;
          background: rgba(0,0,0,0.03);
          border-radius: 4px;
          padding: 4px;
          border-left: 2px solid #075e54;
          text-decoration: none;
        }
        .wa-link-text {
          display: block;
          font-size: 0.55rem;
          color: #0275d8;
        }
        .wa-message-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2px;
          font-size: 0.48rem;
          color: rgba(0,0,0,0.4);
          margin-top: 2px;
        }
        .wa-ticks {
          color: #53bdeb;
          font-weight: 700;
        }
        .wa-action-button-mock {
          width: 90%;
          background: #ffffff;
          border-radius: 8px;
          padding: 6px;
          text-align: center;
          font-size: 0.65rem;
          color: #007aff;
          font-weight: 600;
          box-shadow: 0 1px 1px rgba(0,0,0,0.06);
          align-self: flex-start;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        /* Email Mockup */
        .email-client-mockup {
          width: 100%;
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .email-header-fields {
          padding: 10px 14px;
          background: #f8fafc;
          border-bottom: 1.5px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .email-field {
          display: flex;
          font-size: 0.68rem;
          line-height: 1.4;
        }
        .email-field .label {
          color: var(--color-text-3);
          width: 50px;
          font-weight: 600;
        }
        .email-field .val {
          color: var(--color-text-2);
          flex: 1;
        }
        .email-body-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .email-brand-banner {
          font-family: var(--font-serif), serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--color-primary);
          border-bottom: 2px solid var(--color-primary-dim);
          padding-bottom: 8px;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .email-text {
          font-size: 0.72rem;
          color: var(--color-text-2);
          line-height: 1.55;
          margin: 0 0 12px 0;
          white-space: pre-wrap;
        }
        .email-cta-btn {
          display: inline-block;
          background: var(--color-primary);
          color: white !important;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 99px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(214, 66, 56, 0.25);
        }
        .email-footer-brand {
          margin-top: 16px;
          border-top: 1px solid var(--color-border);
          padding-top: 10px;
          font-size: 0.58rem;
          color: var(--color-text-3);
          text-align: center;
        }

        /* ── Logs Filters & Details ── */
        .logs-filter-console {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }
        .search-bar-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 250px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          pointer-events: none;
          color: var(--color-text-3);
        }
        .clear-search-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clear-search-btn:hover {
          color: var(--color-text-2);
        }
        .filters-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .select-icon {
          position: absolute;
          left: 10px;
          pointer-events: none;
          color: var(--color-text-3);
        }
        
        /* Initials Circle */
        .initials-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary-dim);
          border: 1.5px solid var(--color-primary-border);
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Delivery Tags */
        .channel-delivery-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2.5px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .channel-delivery-tag.wa {
          background: rgba(37,211,102,0.06);
          border: 1px solid rgba(37,211,102,0.15);
          color: #25d366;
        }
        .channel-delivery-tag.email {
          background: var(--color-primary-dim);
          border: 1px solid var(--color-primary-border);
          color: var(--color-primary);
        }

        .delivery-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2.5px 8px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 600;
        }
        .delivery-status-badge.success {
          background: var(--color-success-bg);
          color: var(--color-success);
        }
        .delivery-status-badge.failure {
          background: var(--color-danger-bg);
          color: var(--color-danger);
        }
        .pulse-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .pulse-dot.green {
          background: var(--color-success);
          animation: status-pulse 1.8s infinite;
        }
        .pulse-dot.red {
          background: var(--color-danger);
          animation: status-pulse-red 1.8s infinite;
        }

        .tooltip-message {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: #00021d;
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
          white-space: normal;
          max-width: 180px;
          width: max-content;
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 100;
        }
        .group:hover .tooltip-message {
          opacity: 1;
        }

        @keyframes status-pulse {
          0% { box-shadow: 0 0 0 0px rgba(16, 185, 129, 0.4); }
          100% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
        }
        @keyframes status-pulse-red {
          0% { box-shadow: 0 0 0 0px rgba(220, 38, 38, 0.4); }
          100% { box-shadow: 0 0 0 5px rgba(220, 38, 38, 0); }
        }
      `}</style>
    </div>
  )
}
