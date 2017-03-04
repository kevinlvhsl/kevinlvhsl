<template lang="jade">
.game-box
    .container
        ul.puzzle-wrap
            li(:class="{'puzzle': true, 'puzzle-empty': !puzzle}", v-for='(puzzle, index) in puzzles', v-text='puzzle', @click='moveFn(index)')
            transition(name="fade")
                .start-mask(v-show="!started")
                    el-button.btn-reset(@click.native="startGame") 开始游戏
        ul.heroes-list
            .curr-time(v-if="started") 本次用时：{{time}} 秒
            h2 英 雄 榜
            li.log-line(v-for="(hero, index) in heroes")
                strong {{index+1}}
                .name {{hero.name | cutstr}}
                time  用时{{hero.times}}秒 &nbsp; {{hero.date | convertDate}}
</template>

<script>
import GameLogApi from '../api/gameLog'
import { convertDate, cutstr } from '../filters/'

export default {
    data () {
        return {
            started: false,
            time: 0,
            timer: '',
            puzzles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            heroes: []
        }
    },
    methods: {
        // 重置渲染
        render () {
            let puzzleArr = []
            let i = 1
            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }
            // 随机打乱数组
            puzzleArr = puzzleArr.sort(() => Math.random() - 0.5)
            // 页面显示
            this.puzzles = puzzleArr
            this.puzzles.push('')
        },
        // 点击方块
        moveFn (index) {
            // 获取点击位置及其上下左右的值
            const curNum = this.puzzles[index]
            const leftNum = this.puzzles[index - 1]
            const rightNum = this.puzzles[index + 1]
            const topNum = this.puzzles[index - 4]
            const bottomNum = this.puzzles[index + 4]
            // 和为空的位置交换数值

            if (leftNum === '' && index % 4) {
                this.puzzles[index - 1] = curNum
                this.puzzles.splice(index - 1, 1, curNum)
                this.puzzles.splice(index, 1, '')
            } else if (rightNum === '' && index % 4 !== 3) {
                this.puzzles.splice(index + 1, 1, curNum)
                this.puzzles.splice(index, 1, '')
            } else if (topNum === '') {
                this.puzzles.splice(index - 4, 1, curNum)
                this.puzzles.splice(index, 1, '')
            } else if (bottomNum === '') {
                this.puzzles.splice(index + 4, 1, curNum)
                this.puzzles.splice(index, 1, '')
            }
            this.passFn()
        },
        // 校验是否过关
        passFn () {
            if (this.puzzles[15] === '') {
                const newPuzzles = this.puzzles.slice(0, 15)
                const isPass = newPuzzles.every((e, i) => e === i + 1)
                if (isPass) {
                    App.log('恭喜，闯关成功！')
                    this.started = false

                    this.$prompt(`英雄，您用时${this.time}秒，留下您的大名吧！`, '恭喜，闯关成功！', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        this.$store.dispatch('saveGameLog', {
                            data: {
                                name: value,
                                times: this.time
                            },
                            cb: (res) => {
                                console.log('添加成了', res)
                                this.$message({
                                    type: 'success',
                                    message: `你的大名是: ${value || '无名英雄'}`
                                })
                                this.initHeroes()
                                this.time = 0
                            }
                        })
                    })
                    // .catch(() => {
                    //     this.$message({
                    //         type: 'info',
                    //         message: '您不肯留名'
                    //     })
                    //     this.time = 0
                    // })
                }
            }
        },
        startGame () {
            this.resetGame()
            this.started = true
            this.timer = setInterval(() => {
                if (!this.started) {
                    return
                }
                this.time++
            }, 1000)
        },
        resetGame () {
            this.time = 0
            this.render()
        },
        clearTimer () {
            clearInterval(this.timer)
            this.timer = null
        },
        initHeroes () {
            this.$store.dispatch('getGameLogs', (res) => {
                this.heroes = res
            })
        }
    },
    filters: {
        convertDate,
        cutstr
    },
    mounted () {
        // this.render()
        this.initHeroes()
    },
    beforeRouteEnter (to, from, next) {
        console.log('game enter')
        next()
    },
    beforeRouteLeave (to, from, next) {
        console.log('game leave')
        if (this.started) {
            this.$confirm('游戏还未结束，确定要离开？', '警告', {
                confirmButtonText: '确认离开',
                cancelButtonText: '继续玩',
                type: 'warning'
            }).then(() => {
                this.started = false
                this.clearTimer()
                next()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
                next(false)
            })
        } else next()
    }
}
</script>

<style lang="sass">
@import '../sass/main.sass'

.game-box
    min-width: 1200px
    min-height: 500px
    .container
        width: 100%
        height: 100%
        margin: 0px auto
        text-align: center
        display: flex
        align-items: stretch
    .heroes-list
        flex: 40%
        padding: 40px
        overflow-y: scroll
        .curr-time
            color: $themeBlue
            font-size: 18px
        h2
            color: #fff
            font-size: 22px
            line-height: 40px
        .log-line
            font-size: 18px
            text-align: left
            color: #fff
            background-color: $themeBlue
            padding: 0 20px
            line-height: 30px
            border-bottom: 1px solid #fff
            display: flex
            &:hover
                color: $themeBlue
                background-color: #fff
            strong
                padding-right: 20px
            .name
                flex: 1
                overflow-x: hidden
            time
                font-size: 16px

    .puzzle-wrap
        width: 40%
        margin: 20px
        padding: 0
        background: #ccc
        list-style: none
        position: relative
        .start-mask
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            background-color: rgba(0, 0, 0, .5)
            text-align: center
            .btn-reset
                margin-top: 45%
                box-shadow: inset 4px 4px 18px

        .puzzle
            float: left
            width: 25%
            height: 25%
            line-height: 25%
            font-size: 30px
            background: $themeBlue
            color: #fff
            text-align: center
            line-height: 100px
            border: 1px solid #ccc
            box-shadow: 1px 1px 4px
            text-shadow: 1px 1px 1px #B9B4B4
            cursor: pointer

        .puzzle-empty
            background: #ccc
            box-shadow: inset 2px 2px 18px


</style>
<!--
<template>
        <div class="box">
                <ul class="puzzle-wrap">
                        <li
                                :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
                                v-for="puzzle in puzzles"
                                v-text="puzzle"
                                @click="moveFn($index)"
                        ></li>
                </ul>
                <button class="btn btn-warning btn-block btn-reset" @click="render">重置游戏</button>
        </div>
</template>

<script>
export default {
        data () {
                return {
                        puzzles: []
                }
        },
        methods: {
                // 重置渲染
                render () {
                        let puzzleArr = [],
                                i = 1
                        // 生成包含1 ~ 15数字的数组
                        for (i; i < 16; i++) {
                                puzzleArr.push(i)
                        }
                        // 随机打乱数组
                        puzzleArr = puzzleArr.sort(() => {
                                return Math.random() - 0.5
                        });
                        // 页面显示
                        this.puzzles = puzzleArr
                        this.puzzles.push('')
                },
                // 点击方块
                moveFn (index) {
                        // 获取点击位置及其上下左右的值
                        let curNum = this.puzzles[index],
                                leftNum = this.puzzles[index - 1],
                                rightNum = this.puzzles[index + 1],
                                topNum = this.puzzles[index - 4],
                                bottomNum = this.puzzles[index + 4]
                        // 和为空的位置交换数值
                        if (leftNum === '' && index % 4) {
                                this.puzzles.$set(index - 1, curNum)
                                this.puzzles.$set(index, '')
                        } else if (rightNum === '' && 3 !== index % 4) {
                                this.puzzles.$set(index + 1, curNum)
                                this.puzzles.$set(index, '')
                        } else if (topNum === '') {
                                this.puzzles.$set(index - 4, curNum)
                                this.puzzles.$set(index, '')
                        } else if (bottomNum === '') {
                                this.puzzles.$set(index + 4, curNum)
                                this.puzzles.$set(index, '')
                        }
                        this.passFn()
                },
                // 校验是否过关
                passFn () {
                        if (this.puzzles[15] === '') {
                                const newPuzzles = this.puzzles.slice(0, 15)
                                const isPass = newPuzzles.every((e, i) => e === i + 1)
                                if (isPass) {
                                        alert ('恭喜，闯关成功！')
                                }
                        }
                }
        },
        ready () {
                this.render()
        }
}
</script>

<style>
@import url('./assets/css/bootstrap.min.css');
body {
        font-family: Arial, "Microsoft YaHei";
}
.box {
        width: 400px;
        margin: 50px auto 0;
}
.puzzle-wrap {
        width: 400px;
        height: 400px;
        margin-bottom: 40px;
        padding: 0;
        background: #ccc;
        list-style: none;
}
.puzzle {
        float: left;
        width: 100px;
        height: 100px;
        font-size: 20px;
        background: #f90;
        text-align: center;
        line-height: 100px;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 4px;
        text-shadow: 1px 1px 1px #B9B4B4;
        cursor: pointer;
}
.puzzle-empty {
        background: #ccc;
        box-shadow: inset 2px 2px 18px;
}
.btn-reset {
        box-shadow: inset 2px 2px 18px;
}
</style> -->
