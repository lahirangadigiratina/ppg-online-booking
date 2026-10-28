import { useEffect, useState } from 'react'
import type { CollectStore } from '../delivery-destination/collectStoreOptions'

export type SendingLocationStatus = 'checking' | 'on' | 'off'

type UseSendingLocationOptions = {
  nearestStore: CollectStore
  /** Demo: force location on/off (e.g. URL ?sendingLocation=off) */
  override?: 'on' | 'off' | null
}

export function useSendingLocation({
  nearestStore,
  override = null,
}: UseSendingLocationOptions) {
  const [status, setStatus] = useState<SendingLocationStatus>(
    override ? (override === 'on' ? 'on' : 'off') : 'checking',
  )
  const [detectedStore, setDetectedStore] = useState(nearestStore)

  useEffect(() => {
    if (override === 'on') {
      setStatus('on')
      setDetectedStore(nearestStore)
      return
    }
    if (override === 'off') {
      setStatus('off')
      return
    }

    if (!navigator.geolocation) {
      setStatus('off')
      return
    }

    setStatus('checking')
    navigator.geolocation.getCurrentPosition(
      () => {
        setStatus('on')
        setDetectedStore(nearestStore)
      },
      () => setStatus('off'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300_000 },
    )
  }, [nearestStore, override])

  return { status, detectedStore }
}
