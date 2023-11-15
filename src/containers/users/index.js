import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import Avatar from '../../assets/avatar.svg'
import Arrow from '../../assets/arrow.svg'
import Trash from '../../assets/trash.svg'


import H1 from '../../components/Title';
import ContainerItems from '../../components/containerItems';
import Button from '../../components/button';

import {
  Container,
  Image,
  User
} from './styles'


const Users = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users");

      setUsers(newUsers);
    }

    fetchUsers()
  }, [])

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)

    const newUsers = users.filter(user => user.id !== userId)

    setUsers(newUsers)
  }

  function goBackPage(){
    navigate('/')
  }


  return (
    <Container>
      <Image alt='Avatar' src={Avatar} />
      <ContainerItems isBlur={true}>

        <H1>Usuários</H1>

        <ul>
          {users.map(user => (
            <User key={user.id}>
              <p>{user.name}</p> <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt='Lata-de-lixo' />
              </button>
            </User>
          ))
          }
        </ul>

        <Button isBack={true} onClick={goBackPage}>
         <img alt='seta' src={Arrow} />  Voltar 
        </Button>

      </ContainerItems>
    </Container>
  );
}

export default Users