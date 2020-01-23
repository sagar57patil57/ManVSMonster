new Vue({
    el: '#app',

    data: {
        health_of_man: 100,
        health_of_monster: 100,
        isStarted: false,
        turns: []
    },

    methods: {
        startGame: function(){
            this.isStarted = true
            this.health_of_monster = 100
            this.health_of_man = 100
            this.turns = []
        },

        getRand: function(min, max) {
            return Math.ceil(Math.random() * (max - min) + min)
        },

        attacked: function(){
            //  monster
            const randomValue2 = this.getRand(0,20)
            this.health_of_monster-=randomValue2
            //  unshift: opposite of push
            this.turns.unshift({
                isMan: true,
                data: 'Man hits Monster for' + randomValue2
            })

            if(this.checkWin()){    //  check if monster lost
                return
            }
            
            //  man
            const randomValue1 = this.getRand(5,15)
            this.health_of_man-=randomValue1
            this.turns.unshift({
                isMan: false,
                data: 'Monster hits Man for' + randomValue1
            })
        
            this.checkWin()
        },

        specialAttacked: function(){
            //  monster
            const randomValue2 = this.getRand(10,25)
            this.health_of_monster-=randomValue2

            if(this.checkWin()){    //  check if monster lost
                return
            }
            this.turns.unshift({
                isMan: true,
                data: 'Man used special move' + randomValue2
            })
            
            //  man
            const randomValue1 = this.getRand(0,35)
            this.health_of_man-=randomValue1
            this.turns.unshift({
                isMan: false,
                data: 'Monster hits Man for' + randomValue1
            })
        
            this.checkWin()
        },

        healed: function(){
            if(this.health_of_man<=90){
                this.health_of_man+=10
            }
            else{
                this.health_of_man=100
            }
            this.turns.unshift({
                isMan: true,
                data: 'Man healed'
            })

            const randomValue1 = this.getRand(0,15)
            this.health_of_man-=randomValue1
            this.turns.unshift({
                isMan: false,
                data: 'Monster hits Man for' + randomValue1
            })
        
            this.checkWin()
        },

        started: function(){
            this.isStarted = !this.isStarted
        },

        givenUp: function(){
            this.isStarted=false
        },

        checkWin: function(){
            if(this.health_of_monster<=0){
                alert('you won')
                this.startGame()
                return true
            }
            else if(this.health_of_man<=0){
                alert('you lost')
                this.startGame()
                return false
            }
        }
    }
})