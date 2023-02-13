import vue from '../main'

const notificationSystem = {
  options: {
    show: {
      theme: 'dark',
      icon: 'icon-person',
      position: 'topCenter',
      progressBarColor: 'rgb(0, 255, 184)',
      buttons: [
        [
          '<button>Ok</button>',
          // eslint-disable-next-line no-unused-vars
          function (instance, toast) {
            alert('Hello world!')
          },
          true,
        ],
        [
          '<button>Close</button>',
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: 'fadeOutUp',
                onClosing: function (instance, toast, closedBy) {
                  console.info('closedBy: ' + closedBy)
                },
              },
              toast,
              'buttonName'
            )
          },
        ],
      ],
      // eslint-disable-next-line no-unused-vars
      onOpening: function (instance, toast) {
        console.info('callback abriu!')
      },
      onClosing: function (instance, toast, closedBy) {
        console.info('closedBy: ' + closedBy)
      },
    },
    ballon: {
      balloon: true,
      position: 'topRight',
      timeout: 3000,
    },
    info: {
      position: 'topRight',
      timeout: 3000,
    },
    success: {
      position: 'topRight',
      timeout: 3000,
    },
    warning: {
      position: 'topRight',
      timeout: 3000,
    },
    error: {
      position: 'topRight',
      timeout: 3000,
    },
    question: {
      timeout: 20000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      position: 'center',
      buttons: [
        [
          '<button><b>YES</b></button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
          },
          true,
        ],
        [
          '<button>NO</button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
          },
        ],
      ],
      onClosing: function (instance, toast, closedBy) {
        console.info('Closing | closedBy: ' + closedBy)
      },
      onClosed: function (instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy)
      },
    },
  },
}

class Toast {
  static show(msg) {
    vue.$toast.show(msg, '欢迎', notificationSystem.options.ballon)
  }

  static info(msg) {
    vue.$toast.info(msg, '信息', notificationSystem.options.info)
  }

  static success(msg) {
    vue.$toast.success(msg, '成功', notificationSystem.options.success)
  }

  static warning(msg) {
    vue.$toast.warning(msg, '警告', notificationSystem.options.warning)
  }

  static error(msg) {
    vue.$toast.error(msg, '错误', notificationSystem.options.error)
  }

  static confirm(title = '警告', msg = "'Please do not do this.<br>Do you really want to exit?'", callback) {
    // vue.$toast.question('是否确认？', 'Hey', notificationSystem.options.question)
    vue.$confirm(msg, { title: title }).then((res) => {
      if (res) {
        callback()
        // confirm("Do you really want to exit");
      }
    })
  }

  static deleteConfirm(title = '警告', msg = "是否确认删除？'", callback) {
    // vue.$toast.question('是否确认？', 'Hey', notificationSystem.options.question)
    vue.$confirm(msg, { title: title }).then((res) => {
      if (res) {
        callback()
        // confirm("Do you really want to exit");
      }
    })
  }
}

export default Toast
