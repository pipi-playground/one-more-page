"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          /* 기본 토스트 — 연한 세이지 그린 */
          "--normal-bg": "#eef5ee",
          "--normal-text": "#2c4a2c",
          "--normal-border": "#c4d8c4",

          /* 성공 — 맑은 초록 */
          "--success-bg": "#e2f0e2",
          "--success-text": "#1a421a",
          "--success-border": "#a8cca8",

          /* 에러 — 부드러운 테라코타 (강렬한 빨강 대신) */
          "--error-bg": "#f5ede8",
          "--error-text": "#5c2a1e",
          "--error-border": "#d4a898",

          /* 정보 */
          "--info-bg": "#e8f0f5",
          "--info-text": "#1e3a4a",
          "--info-border": "#a8c4d4",

          "--border-radius": "0.75rem",
          "--font-size": "0.875rem",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          boxShadow: "0 2px 12px rgba(44, 74, 44, 0.10)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
