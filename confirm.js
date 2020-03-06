import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** 用法1:then和catch
componentDidMount = () => {
  const res = confirm({
    title: '确定删除吗?',
    okText: '确定',
    cancelText: '取消',
    // getPopupContainer: () => {

    // },
  });
  res.then((data) => {
    console.log('确定');
  }).catch((data) => {
    console.log('取消');
  });
}
*/

/** 用法2:try,catch
componentDidMount = async () => {
  try {
    const res = await confirm({
      title: '确定删除吗?',
      okText: '确定',
      cancelText: '取消',
    });
    if (res) {
      console.log('确定');
    }
  } catch (data) {
    console.log('取消');
  }
}
*/
const confirm = ({ okText, cancelText, title }) => {
  return new Promise((resolve, reject) => {
    class ConfirmDialog extends Component {
      constructor(props) {
        super(props);
        this.state = {
          show: true,
        };
      }

      handleOk = () => {
        this.setState({ show: false });
        resolve(true);
      }
      handleCancel = () => {
        this.setState({ show: false });
        reject(false);
      }
      render() {
        const maskStyle = {
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: 'rgba(55, 55, 55, 0.6)',
          height: '100%',
          zIndex: '1000',
        };
        const wrapStyle = {
          position: 'fixed',
          overflow: 'auto',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          outline: 0,
        };
        const modalStyle = {
          position: 'relative',
          margin: '0 auto',
          top: '100px',
          paddingBottom: '24px',
          width: '416px',
          transformOrigin: '354px 84px',
        };
        const modalContentStyle = {
          position: 'relative',
          backgroundColor: '#fff',
          border: 0,
          borderRadius: '4px',
          backgroundClip: 'padding-box',
        };
        const modalBodyStyle = {
          fontSize: '12px',
          lineHeight: 1.5,
          padding: '30px 40px',
        };
        const btnArrStyle = {
          marginTop: '30px',
          float: 'right',
        };
        const btnStyle = {
          display: 'inline-block',
          marginBottom: 0,
          fontWeight: 500,
          textAlign: 'center',
          touchAction: 'manipulation',
          cursor: 'pointer',
          backgroundImage: 'none',
          border: '1px solid transparent',
          whiteSpace: 'nowrap',
          lineHeight: 1.15,
          userSelect: 'none',
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          position: 'relative',
          color: 'rgba(0, 0, 0, 0.65)',
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
          padding: '0 15px',
          borderRadius: '4px',
          height: '32px',
          marginLeft: '10px',
        };
        const titleStyle = {
          color: 'rgba(0, 0, 0, 0.65)',
          fontWeight: 'bold',
          fontSize: '14px',
        };
        return this.state.show ? (
          <div>
            <div style={maskStyle} />
            <div style={wrapStyle}>
              <div style={modalStyle}>
                <div style={modalContentStyle}>
                  <div style={modalBodyStyle}>
                    <div style={{ height: '70px' }}>
                      <div>
                        <span style={titleStyle}>{title}</span>
                      </div>
                      <div style={btnArrStyle}>
                        <button type="button" style={btnStyle} onClick={this.handleCancel}>
                          <span>{cancelText}</span>
                        </button>
                        <button type="button" style={btnStyle} onClick={this.handleOk}>
                          <span>{okText}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: 0, height: 0, overflow: 'hidden' }}>sentinel</div>
              </div>
            </div>
          </div>
        ) : null;
      }
    }
    const container = document.createElement('div');
    document.querySelector('body').appendChild(container);
    ReactDOM.render(<ConfirmDialog okText={okText} cancelText={cancelText} title={title} />, container);
  });
};

export default confirm;
