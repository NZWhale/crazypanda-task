import * as React from 'react'
import { Component } from 'react'
import { Button, Input, Pagination, Popup, Radio, Table } from 'semantic-ui-react'
import { HuePicker } from 'react-color';


class TableComponent extends Component {
  state = {
    data: ["First task, for example", "And second task"] as any,
    page: 1,
    inputValue: "",
    sortByLength: true,
    sorted: false,
    textOrBackground: false,
    backgroundColor: "#ffffff",
    textColor: "black"
  }
  render() {
    const { inputValue, data, sortByLength, sorted, page, backgroundColor, textOrBackground, textColor } = this.state
    document.body.style.backgroundColor = backgroundColor
    const itemsPerPage = 50
    const tableCells = data.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((e: any, index: any) => (
      <Table.Row key={index}>
        <Table.Cell style={{color: textColor}}>{e}</Table.Cell>
      </Table.Row>
    ))
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div>
            <Input
              action={
                <Button
                  basic
                  onClick={() => {
                    data.push(inputValue)
                    this.setState({ data: data })
                  }}
                >Add</Button>
              }
              onChange={(e) => { this.setState({ inputValue: e.target.value }) }}
            />
            <Popup
              trigger={
                <Radio
                  slider
                  style={{ paddingTop: "5px", paddingLeft: "10px" }}
                  onChange={() => this.setState({ sortByLength: !sortByLength })}
                />
              }
              content='Sort by length or alphabet'
              on='hover'
            />
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
            <Popup
              trigger={
                <Radio
                  slider
                  style={{ paddingTop: "10px", marginRight: "10px" }}
                  onChange={() => this.setState({ textOrBackground: !textOrBackground })}
                />
              }
              content='Change background or text color'
              on='hover'
            />
            <div style={{margin: "10px"}}>
            <HuePicker 
            width={"200px"}
            color={textOrBackground?backgroundColor:textColor} 
            onChange={(value) => {
              textOrBackground?this.setState({ backgroundColor: value.hex }):this.setState({textColor: value.hex})

            }} />
            </div>
          </div>
        </div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                onClick={() => {
                  const sortedData = data.sort(function (a: any, b: any) {
                    if (sortByLength) {
                      return sorted ? b.length - a.length : a.length - b.length
                    } else {
                      return sorted ? b.localeCompare(a) : a.localeCompare(b)
                    }
                  })
                  this.setState({ sorted: !sorted })
                  this.setState({ data: sortedData })
                }}
              >
                Name
          </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableCells}
          </Table.Body>
        </Table>
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={data.length / 50}
          onPageChange={(e, value) => this.setState({ page: value.activePage })}
        />
      </>
    )
  }
}

export default TableComponent