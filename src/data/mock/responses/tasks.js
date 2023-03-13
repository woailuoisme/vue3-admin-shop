import Mock from 'mockjs'
const Random = Mock.Random

export default [
  {
    pre_step: {
      work_info: {
        id: '',
      },
    },
    steps: [
      {
        name: Random.ctitle(),
        id: Random.guid(),
        type: Random.pick(['manual', 'automatic']),
        frequency: {
          times: 1,
          rounds: ['T1'],
          rate: 'noInterval',
          rate_info: {
            num: '',
            unit: 'day',
          },
          time_range: [1, 1],
        },
      },
    ],
  },
]
