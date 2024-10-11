// plugins/global-functions.js
import { Notification } from 'element-ui'

export default (context, inject) => {
  // Global function
  inject(
    'notification',
    (
      message,
      title = 'Warning',
      type = 'warning',
      duration = 8,
      position = 'bottom-right'
    ) => {
      if (type === 'warning' || type === 'success') {
        Notification({
          title,
          message,
          type,
          duration: duration * 1000,
          position,
        })
      } else {
        Notification[type]({
          title,
          message,
          duration: duration * 1000,
          position,
        })
      }
    }
  )
}
