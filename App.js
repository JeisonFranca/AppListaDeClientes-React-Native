import React, { Component } from 'react';
import {ToastAndroid ,View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppOrganizacao extends Component {

  constructor(props){
    super(props);
    this.state={
      nome:'',
      produto:'',
      modalVisible: false,
      lista: ''
    }
    this.adicionarCliente = this.adicionarCliente.bind(this)
    this.deleteCliente = this.deleteCliente.bind(this)
    this.fecharModal = this.fecharModal.bind(this)
  }


  async componentDidMount(){
    await AsyncStorage.getItem('lista').then((value)=>{
      this.setState({lista: JSON.parse(value)})
    })
  }

  async componentDidUpdate(_, prevState){
    try {
      let lista = this.state.lista;
      if(prevState !==  lista){
      await AsyncStorage.setItem('lista', JSON.stringify(lista))
    }
    } catch (error) {
      console.log(error)
    }
    
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  deleteCliente(id){
     let list = this.state.lista.filter((item)=> item.id !== id)
    this.setState({lista: list})
    console.log(list)
  }

  adicionarCliente(){

    let list = this.state.lista
    let nome = this.state.nome
    let produto = this.state.produto

    if(nome=='' || produto == ''){
      ToastAndroid.show("Digite o nome e o produto", ToastAndroid.SHORT);
    }else{
      list.push({id: Math.floor(Math.random() * 9999999) ,nome: nome, produto: produto})
      this.setState({lista: list})
      console.log(list)
      this.setModalVisible(!this.state.modalVisible)
      this.setState({nome:'', produto: ''})
    }
  }

  fecharModal(){
    this.setState({ modalVisible: false });
    this.setState({nome:'', produto: ''})
  }

 render(){
  return (
    <View style={{flex:1}}>
          <Modal
            style={styles.containerModal}
            animationType = {"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.displayModal(false)
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  
                  <View style={{marginTop:20}}>
                    <Text style={{color:'white'}}>Nome:</Text>
                    <TextInput style={{backgroundColor:'white',width:250,paddingLeft:10}} value= {this.state.nome} onChangeText={(nome)=> this.setState({nome: nome})}/>
                    <Text style={{color:'white'}}>Produto:</Text>
                    <TextInput style={{backgroundColor:'white',width:250,paddingLeft:10}} value= {this.state.produto} onChangeText={(Produto)=> this.setState({produto: Produto})}/>
                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-between',width:250, marginTop:30}}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.adicionarCliente}
                    >
                      <Text style={styles.textStyle}>ADICIONAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.fecharModal}
                    >
                      <Text style={styles.textStyle}>CANCELAR</Text>
                    </TouchableOpacity>
                  </View>
                  

                </View>
              </View>
          </Modal>
          


      <View style={{backgroundColor:'green', alignItems:'flex-end',paddingRight:15}}>
      <Text style={{fontSize:15, color:'white'}}>Criado por: Jeison França</Text>
          <TouchableOpacity onPress={()=>this.setModalVisible(true)}>
            <Text style={{fontSize:25}}>+</Text>
          </TouchableOpacity>
      </View>
        <FlatList
          keyExtractor={(item)=> item.id}
          data={this.state.lista}
          renderItem={({item})=> 
          <View style={{marginTop:20,flexDirection:'row',borderBottomWidth:1}}>
            <View style={{paddingLeft:20,width:250,marginLeft:20}}>
              <Text style={{}}>Nome: {item.nome}</Text>
              <Text>Produto:<Text/> {item.produto}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>this.deleteCliente(item.id)}>
                <Text>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        />
    </View>
   );
 }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:300,
    height:300,
    backgroundColor: "green",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
});