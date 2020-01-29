// components/dateRange/dateRange.js
import moment from 'moment'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    now: null,

    pre: null,
    cur: null,
    next: null,

    checked: null,
    dataList: []
  },

  lifetimes: {
    attached() {
      this.data.now = moment().format('YYYY/MM/DD')
      this.init(this.data.now)
      this.renderList()
    }
  },
  /**     
   * 组件的方法列表
   */
  methods: {
    init(date) {
      const now = moment(date, 'YYYY/MM/DD')
      
      this.setData({
        cur: this.getBaseData(now)
      })

      const next = now.add(1,'M')
      this.data.next = this.getBaseData(next)

      let pre = now.subtract(2, 'M')
      this.data.pre = this.getBaseData(pre)
    },
    renderList() {
      let curArr = this.numToArr(this.data.cur, 'cur')
      let preArr = this.numToArr(this.data.pre, 'pre')
      let nextArr = this.numToArr(this.data.next, 'next')
      let before = preArr.slice(preArr.length - this.data.cur.weekdayStart, preArr.length)
      let after = nextArr.slice(0, this.data.next.weekdayStart == 0 ? 0 : 7 - this.data.next.weekdayStart)  
      
      let newArr = this.chunk([...before, ...curArr, ...after])
      this.setData({
        dataList: newArr
      })
    },
    /****** events ****/
    handleCheck(e) {
      const value = e.currentTarget.dataset['value'];
      this.data.checked = value
      this.renderList()
    },
    handlePre(e) {
      this.init(this.data.pre.value)
      this.renderList()
    },
    handleNext() {
      this.init(this.data.next.value)
      this.renderList()
    },
    /********util********/
    getBaseData(momentDate) {
      const year = momentDate.get("year")
      const month = momentDate.get('month') + 1
      return {
        value: momentDate.format('YYYY/MM/DD'),
        days: momentDate.daysInMonth(),
        weekdayStart: moment(`${year}/${month}/1`, 'YYYY/MM/DD').weekday(),
        year,
        month,
        date: momentDate.get('date')
      }
    },
    chunk(arr, num) {
      const size = num || 7
      let newArr = []
      const length = arr.length
      for (let i = 0; i < length / size  ;i++) {
        newArr[i] = arr.slice(i * size, (i + 1) * size)
      }
      return newArr
    },
    numToArr(obj, className) {
      const num = obj.days
      let arr = []
      for (let i = 1; i < num + 1;i++){
        const value = moment(`${obj.year}/${obj.month}/${i}`, 'YYYY/MM/DD').format('YYYY/MM/DD')
        let classNames = className
        value == this.data.now && (classNames = `${className} active`)
        value == this.data.checked && (classNames = `${className} checked`)
        arr.push({
          value,
          date: i,
          classNames,
        })
      }
      return arr
    }
  }
})
