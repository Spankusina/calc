const App = {
    data() {
        return {
            listButtons: ['C', '<=', '√', '/', '1', '2', '3', '*', '4', '5', '6', '-', '7', '8', '9', '+', '±', '0', '.', '='],
            displayValue: '0',
            firstValue: 0,
            secondValue: 0,
            sign: ''
        }
    },
    methods: {
        onClickButton(char) {
            if (this.sign && !this.secondValue && !['-', '*', '/', '+'].includes(char)) {
                this.displayValue = '0'
            }

            if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(char)){
                this.inputNumber(char)
            }
            else if (char === 'C') {
                this.clear()
            }
            else if (char === '<=') {
                this.backspace()
            }
            else if (['-', '*', '/', '+'].includes(char)) {
                this.procedure(char)
            }
            else if (char === '=') {
                this.equals()
            }
            else if (char === '±'){
                this.switchPlusMinus()
            }
            else if (char === '√'){
                this.sqrt()
            }
        },
        inputNumber(char) {
            if (this.displayValue === '0'){
                if (char === '0') {
                    return
                }
                else if (char === '.'){
                    this.displayValue = '0.'
                }
                else {
                    this.displayValue = char
                }
            }
            else {
                this.displayValue += char
            }    

            this.updateValues()
        },
        clear() {
            this.displayValue = '0'
            this.firstValue = 0
            this.secondValue = 0
            this.sign = ''
            this.unactiveButtons()
        },
        backspace() {
            this.displayValue = this.displayValue != '0' && this.displayValue.length > 1 ? this.displayValue.slice(0, -1) : '0'
        },
        updateValues() {
            if (!this.sign){
                this.firstValue = parseFloat(this.displayValue)
            }
            else {
                this.secondValue = parseFloat(this.displayValue)
            }
        },
        procedure(char) {
            if (this.sign && this.secondValue){
                this.calculation()
            }

            this.sign = char
            this.unactiveButtons()
            const buttons = document.querySelectorAll('.btn')
            buttons.forEach(button =>  {
                if (button.textContent === char){
                    const selectButton = new bootstrap.Button(button)
                    selectButton.toggle()
                }
            })
        },
        equals() {
            this.secondValue = parseFloat(this.displayValue)
            this.calculation()
            this.unactiveButtons()
        },
        calculation() {
            if (this.sign === '+'){
                this.displayValue = this.firstValue + this.secondValue
            }
            else if (this.sign === '-'){
                this.displayValue = this.firstValue - this.secondValue
            }
            else if (this.sign === '*'){
                this.displayValue = this.firstValue * this.secondValue
            }
            else if (this.sign === '/'){
                this.displayValue = this.firstValue / this.secondValue
            }
            this.firstValue = this.displayValue
            this.secondValue = 0
            this.sign = ''
        },
        unactiveButtons() {
            const activeButtons = document.querySelectorAll('.active')
            activeButtons.forEach(button =>  {
                const activeButton = new bootstrap.Button(button)
                activeButton.toggle()
            })
        },
        switchPlusMinus() {
            if(parseFloat(this.displayValue) > 0){
                this.displayValue = '-' + this.displayValue
            }
            else if (parseFloat(this.displayValue) === 0) {
                return
            }
            else {
                this.displayValue = this.displayValue.slice(1)
            }
        },
        sqrt() {
            this.displayValue = Math.sqrt(parseFloat(this.displayValue))
            this.updateValues()
        }
    },
}

Vue.createApp(App).mount("#app")