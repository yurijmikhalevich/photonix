const SET_PHOTOS = 'SET_PHOTOS'

const initialState = {
  photos: [],
}

const photos = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PHOTOS:
      return action.payload
    default:
      return state
  }
}

export default photos
