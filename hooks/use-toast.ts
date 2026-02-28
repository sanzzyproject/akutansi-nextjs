import { useState, useEffect } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([])

  const toast = ({ title, description, variant = "default" }: any) => {
    const id = Math.random().toString(36).substr(2, 9)
    // Cukup gunakan alert sementara jika UI toast full belum ada, atau biarkan kosong agar tidak error build
    alert(`${title}\n${description}`) 
  }

  return { toast, toasts }
}
