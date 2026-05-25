import { useCallback, useState } from 'react'
import React from 'react'

type CopyResult = {
  copied: boolean
  copy: (text: string) => Promise<boolean>
  CopyButton: React.FC<{
    text: string
    children?: React.ReactNode
    className?: string
  }>
}

function fallbackCopyTextToClipboard(text: string): boolean {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)
    return successful
  } catch {
    return false
  }
}

export function useCopy(): CopyResult {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    let ok = false
    if (!text) return false
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        ok = true
      } else {
        ok = fallbackCopyTextToClipboard(text)
      }
    } catch {
      ok = fallbackCopyTextToClipboard(text)
    }
    setCopied(ok)
    // reset copied after short delay
    if (ok) setTimeout(() => setCopied(false), 2000)
    return ok
  }, [])

  const CopyButton: React.FC<{ text: string; children?: React.ReactNode; className?: string }> = ({ text, children, className }) => {
    return (
      <button
        type="button"
        className={className}
        onClick={() => { void copy(text) }}
      >
        {children ?? 'Copiar'}
      </button>
    )
  }

  return { copied, copy, CopyButton }
}

export default useCopy
