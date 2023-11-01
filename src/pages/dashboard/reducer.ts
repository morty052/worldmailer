export const dashboardState = {
  uploaded: false,
  previewingEmails: false,
  previewingTemplate: false,
  selectingLink: false,
  sending: false,
  template: null,
  emails: [],
  error: null,
  loading: false,
  success: false,
  link: '',
}

export function dashboardReducer(state, action) {
  switch (action.type) {
    case 'UPLOADED':
      console.log(action.payload)
      return { ...state, uploaded: true, emails: action.payload.emails, previewingEmails: true }
    case 'END_EMAIL_PREVIEW':
      return { ...state, previewingEmails: false, previewingTemplate: true }
    case 'SELECT_TEMPLATE':
      return { ...state, template: action.payload, previewingTemplate: false, selectingLink: true }
    case 'SELECT_LINK':
      return { ...state, link: action.payload, selectingLink: false, sending: true }
    default:
      break
  }
}
