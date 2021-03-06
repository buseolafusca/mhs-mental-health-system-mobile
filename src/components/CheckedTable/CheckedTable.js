import React, { Component } from 'react';

import Table from '@trendmicro/react-table';
import styles from '@trendmicro/react-table';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-table/dist/react-table.css';
import '@trendmicro/react-paginations/dist/react-paginations.css';
import { getServices } from '../../services/BackendService.js'

class SelectableTable extends Component {
    constructor (props) {
      super(props)

      this.state = {
          selectionData: [
        ]
      };
    }

    componentWillMount() {
        getServices().then(data => {
          console.log(data)

          if (data){
            var dataList = []
            for (var i = 0; i < data.length; i++) { 
              dataList.push({id: data[i]._id, checked: false, serviceName: data[i].name});
            }
            this.setState({ selectionData: dataList })

          }
          
          })
    }

    actions = {
        handleClickRow: (record, index, e) => {

            const data = this.state.selectionData.map(item => {
                if (record.id === item.id) {
                    this.props.callbackFromParent(item.id);
                    return {
                        ...item,
                        checked: true
                    };
                }
                else{
                  return {
                        ...item,
                        checked: false
                    };
                }
            });

            this.setState({ selectionData: data });
            e.stopPropagation();
            e.preventDefault();            
        },
        handleRowClassName: (record, key) => {
            const checked = record.checked;
            if (checked) {
                return styles['tr-active'];
            } else {
                return null;
            }
        },
        handleHeaderCheckbox: (e) => {
            const checkbox = e.target;
            const data = this.state.selectionData.map((item, i) => {
                return {
                    ...item,
                    checked: checkbox.checked
                };
            });
            this.setState({ selectionData: data });
            e.stopPropagation();
        },
        renderHeaderCheckbox: () => {
            let className = 'input-checkbox';
            const dataLength = this.state.selectionData.length;
            const selectedLength = this.state.selectionData.length;
            const isSelectedAll = selectedLength > 0 && selectedLength === dataLength;
            if (selectedLength > 0 && selectedLength < dataLength) {
                className += ' checkbox-partial';
            }
            return (
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="headerCheckbox"
                        checked={isSelectedAll}
                        className={className}
                        onChange={this.actions.handleHeaderCheckbox}
                    />
                    <label htmlFor="headerCheckbox" />
                </div>
            );
        },
        renderCheckbox: (value, row) => {
            return (
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id={row.id}
                        className="input-checkbox"
                        checked={row.checked}
                        onChange={(e) => {}}
                    />
                    <label />
                </div>
            );
        }
    };

    columns = [
        { title: "Select service", dataIndex: 'checked', render: this.actions.renderCheckbox, width: 80 },
        { title: 'Service Name', dataIndex: 'serviceName' }
    ];

    render() {
        const columns = this.columns;
        const data = this.state.selectionData;

        return (
            <Table
                rowKey="id"
                columns={columns}
                data={data}
                rowClassName={this.actions.handleRowClassName}
                onRowClick={this.actions.handleClickRow}
            />
        );
    }

}

export default SelectableTable;