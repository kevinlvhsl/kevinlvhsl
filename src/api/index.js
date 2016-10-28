import Vue from 'vue'

import { baseResource } from './resources'

export default {
    signIn (params = {}) {
        params = {
            username: 'liangkevin',
            password: '353030799@qq.com',
            phone: '18612340000'
        }
        baseResource.post({ url: 'user' }, JSON.stringify(params))
    },
    loginAuthorize (redirect = 'index') {
        redirectUri = redirect
        let code = ''
        let state = ''
        if (location.search.indexOf('code') > 0) {
            code = App.queryHref('code')
            state = App.queryHref('state')
            this.getToken(code, state)
        } else {
            location.href = getUrl('login/oauth/authorize')
        }
    },
    getToken (code, state) {
        console.log('access_token:::')
        const url = getUrl('login/oauth/access_token') + '&client_secret=' + CLIENT_SECRET + '&code=' + code + '&state=' + state + '&callback=nihao'
        // var jsontree = [];
        // $.ajax({
        //      url: url,
        //      type: "GET",
        //      dataType: 'JSONP',
        //      jsonp: 'callback',
        //      success: function(result){
        //         jsontree = result;
        //     }
        // })
        Vue.http.get(url, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: host + redirectUri,
            code,
            state
        }, {
            headers: { withCredentials: true }
        }).then((res) => {
            alert(1)
            console.log(res)
        }, (err) => {
            alert(2)
            console.error(err)
        })

        // fetch(
        //     getUrl('login/oauth/access_token') + '&client_secret='+CLIENT_SECRET+'&code='+code + '&state='+state,
        //     {
        //         method: 'POST',
        //         headers: myHeaders,
        //         mode: 'cors',
        //         cache: 'default',
        //         body: {
        //             client_id: CLIENT_ID,
        //             client_secret: CLIENT_SECRET,
        //             redirect_uri: host + redirectUri,
        //             code: code,
        //             state: state
        //         },
        //         success: function(res){
        //             console.error(res)
        //         }
        //     }
        // ).then(function(response) {
        //     console.log(response)
        //     console.log(response.body)
        //     if(response.ok) {
        //         alert('成功了')
        //     }
        //   console.log('success!!!')
        // },function(res){console.log(res)}).catch(() => {
        //     console.error('错误了噢！')
        // })
    }
}
