import AV from 'leancloud-storage'

const APP_ID = 'y6aD4P6kQrnW6WoIks0YCJbo-gzGzoHsz'
const APP_KEY = 'SKpyeXEz5nFrshIQGElFjMvH'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
window.AV = AV
window.APP_ID = APP_ID
window.APP_KEY = APP_KEY
export default AV
