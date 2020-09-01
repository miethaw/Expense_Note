import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Alert, StyleSheet, Modal, Button, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toAddIncome: false,
      toAddSpent: false,
      description: "",
      Income: "",
      Spent: "",
      Total: "",
      tableHead: ['No', 'Description', 'Income', 'Spent', 'Total', 'Edit'],
      tableData: [
        // ['', 'Income', '10000', '-', '100000','Edit'],
        // ['1', 'Water', '-', '4000', '96000','Edit'],
        // ['2', 'Tissue', '-', '3500', '92500','Edit']
      ]
    }
  }
  onChanged = (text) => {
    this.setState({
      Income: text
    })
  }
  onSpentChanged = (text) => {
    this.setState({
      Spent: text
    })
  }
  descriptionChanged = (text) => {
    this.setState({
      description: text
    })
  }
  onEditClicked = (data, index) => {
    Alert.alert(`${data + 1}`)
  }
  handleAddIncome = () => {
    const total = this.state.Income ? new Number(this.state.Income) + this.state.Total : this.state.Total
    this.setState({
      toAddIncome: false, description: "",
      Income: "",
      Total: new Number(total),
      tableData: [...this.state.tableData, ...[[`${this.state.tableData.length + 1}`, `${this.state.description ? this.state.description : '-'}`, `${this.state.Income ? this.state.Income : '0'}`, `${0}`, `${total ? total : '-'}`, 'Edit']]]

    })
  }
  handleAddSpent = () => {
    const total = this.state.Spent ? new Number(this.state.Total) - this.state.Spent : this.state.Total
    this.setState({
      toAddSpent: false,
      description: "",
      Spent: "",
      Total: new Number(total),
      tableData: [...this.state.tableData, ...[[`${1}`, `${this.state.description ? this.state.description : '-'}`, `${0}`, `${this.state.Spent ? this.state.Spent : '0'}`, `${total ? total : '-'}`, 'Edit']]]

    })
  }
  render() {
    const state = this.state
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
      }}>
        <TouchableOpacity onPress={() => Alert.alert("View More")} style={{ paddingTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
              backgroundColor: 'powderblue',
              paddingLeft: 15,
            }}>
            <Icon name="bars" size={30} color="#fff" style={{ padding: 4 }} />
            <Text style={{ color: '#fff', fontSize: 20, padding: 5 }}>For your Expenses</Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: 30, flexDirection: 'row', padding: 8 }}>
          {/* <Box button_Name={"Add Description"} onPress={() => Alert.alert("Description")} /> */}
          <Box button_Name={"Add Income(+)"} onPress={() => this.setState({ toAddIncome: true })} />
          <Box button_Name={"Add Spent(-)"} onPress={() => this.setState({ toAddSpent: true })} />
        </View>
        <View >
          <Modal animationType={"slide"} transparent={false} visible={this.state.toAddIncome}
            onRequestClose={() => Alert.alert("Modal has been closed!")}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Add New Income</Text>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ paddingTop: 30 }}>
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="Income:" onChangeText={(text) => this.onChanged(text)} value={this.state.Income} />
                </View>
                <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                  <TextInput style={styles.input} placeholder="Description:" onChangeText={(text) => this.descriptionChanged(text)} value={this.state.description} />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Box button_Name={"Cancel!"} onPress={() => this.setState({ toAddIncome: false }, () => Alert.alert("Cancel!"))} />
                <Box button_Name={"Add!"} onPress={this.handleAddIncome} />
              </View>
            </View>
          </Modal>
        </View>
        <View >
          <Modal animationType={"slide"} transparent={false} visible={this.state.toAddSpent}
            onRequestClose={() => Alert.alert("Modal has been closed!")}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Add Spent</Text>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ paddingTop: 30 }}>
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="Spent:" onChangeText={(text) => this.onSpentChanged(text)} value={this.state.Spent} />
                </View>
                <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                  <TextInput style={styles.input} placeholder="Description:" onChangeText={(text) => this.descriptionChanged(text)} value={this.state.description} />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Box button_Name={"Cancel!"} onPress={() => this.setState({ toAddSpent: false }, () => Alert.alert("Cancel!"))} />
                <Box button_Name={"Add Spent!"} onPress={this.handleAddSpent} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ paddingTop: 20, flex: 2 }}>
          <ExpensesTable name={"Expense List"} onEditClicked={this.onEditClicked} tableData={state.tableData} tableHead={state.tableHead} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#c8e1ff", paddingLeft: 15 },
  container: { flex: 1, padding: 10, paddingTop: 5, backgroundColor: '#fff' },
  wrapper: { flexDirection: 'row' },
  modalText: { fontSize: 20, color: "darkblue", fontWeight: 'bold' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  input: { backgroundColor: '#F0F8FF', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 10, width: 300 },
  tableContainer: { flex: 1, padding: 15, paddingTop: 10, backgroundColor: '#fff' },
  tableRow: { flexDirection: 'row', height: 50, borderBottomWidth: 1, borderBottomColor: '#00CED1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
})

export const Box = (props) => {
  const { button_Name, onPress } = props
  return (
    <View style={{ padding: 5 }}>

      <TouchableOpacity style={{ padding: 10, backgroundColor: 'skyblue', borderRadius: 10, width: 130 }} onPress={onPress}>
        <Text style={{ color: '#fff', textAlign: 'center' }}> {button_Name}</Text>
      </TouchableOpacity>

    </View>
  )
}
export const ExpensesTable = props => {
  const { name, tableData, tableHead, onEditClicked } = props
  const element = (data, index) => (
    <TouchableOpacity onPress={index => onEditClicked(data, index)}>
      <View style={{ backgroundColor: 'skyblue', borderRadius: 5, width: 40, padding: 3, fontSize: 10 }}>
        <Text style={styles.btnText}>
          Edit
      </Text>
      </View>
    </TouchableOpacity>
  )
  if (!tableData) return null
  console.log(">>", tableData)
  return (
    <View style={{ paddingTop: 20, flex: 2 }}>
      {/* <ExpensesTable name={"Expense List"} tableData={state.tableData} tableHead={state.tableHead} /> */}

      <View style={styles.tableContainer}>
        <ScrollView>
          <Table borderStyle={{ borderColor: 'transparent', borderWidth: 1 }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {
              tableData.map((rowData, index) => (

                <TableWrapper key={index} style={styles.tableRow}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 5 ? element(rowData, index) : cellData} style={{ width: 60 }} />
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
      </View>

    </View>

  )
}
borderWidth: 2