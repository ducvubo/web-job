import { Archive, ArchiveX, File, Inbox, LucideIcon, Send, Trash2 } from 'lucide-react'

export const conTenSideBarCompany: {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  link?: string
  children?: any
}[] = [
  {
    title: 'Quản lý Job',
    label: '9',
    icon: File,
    variant: 'ghost',
    link: '/dashboard/company/job',
    children: [
      {
        title: 'Thêm Job',
        icon: Archive,
        variant: 'ghost',
        link: '/dashboard/company/job/add'
      },
      {
        title: 'Danh sách Job',
        icon: ArchiveX,
        variant: 'ghost',
        link: '/dashboard/company/job'
      },
      {
        title: 'Thùng rác',
        icon: ArchiveX,
        variant: 'ghost',
        link: '/dashboard/company/job/delete'
      }
    ]
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  },
  {
    title: 'Quản lý Hr',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/company/hr'
  }
]

export const conTenSideBarAdmin: {
  title: string
  label?: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  link?: string
  children?: any
}[] = [
  {
    title: 'Quản lý công ty',
    label: '128',
    icon: Inbox,
    variant: 'ghost',
    link: '/dashboard/admin/company',
    children: [
      {
        title: 'Thêm công ty',
        icon: Archive,
        variant: 'ghost',
        link: '/dashboard/admin/company/add'
      },
      {
        title: 'Danh sách công ty',
        icon: ArchiveX,
        variant: 'ghost',
        link: '/dashboard/admin/company'
      }
    ]
  },
  {
    title: 'Drafts',
    label: '9',
    icon: File,
    variant: 'ghost',
    link: '/dashboard/admin/user'
  },
  {
    title: 'Sent',
    label: '',
    icon: Send,
    variant: 'ghost'
  },
  {
    title: 'Junk',
    label: '23',
    icon: ArchiveX,
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: Trash2,
    variant: 'ghost'
  },
  {
    title: 'Sent',
    label: '',
    icon: Send,
    variant: 'ghost'
  },
  {
    title: 'Junk',
    label: '23',
    icon: ArchiveX,
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: Trash2,
    variant: 'ghost'
  },
  {
    title: 'Sent',
    label: '',
    icon: Send,
    variant: 'ghost'
  },
  {
    title: 'Junk',
    label: '23',
    icon: ArchiveX,
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: Trash2,
    variant: 'ghost'
  },
  {
    title: 'Archive',
    label: '',
    icon: Archive,
    variant: 'ghost'
  }
]
