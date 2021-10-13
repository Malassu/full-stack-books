import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { tableIcons } from './tableIcons'
import './App.css'
import axios from 'axios'
import BookForm from './BookForm'
import Link from '@mui/material/Link'


function App() {
  const [data, setData] = useState([])
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  const fetchData = () => {
    axios.get('/api/get_books')
        .then(response => setData(response.data.results))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        My Bookshelf
      </header>
      <div className="Main">
        <div style={{ paddingRight: '20px', width: '50%' }}>
          <BookForm
            id={id}
            title={title}
            author={author}
            description={description}
            setId={setId}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setDescription={setDescription}
            submitCallback={fetchData}
          />
        </div>
        <div style={{ paddingTop: '10px', maxWidth: '45%' }}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              {
                title: 'Title',
                field: 'title',
                render: rowData => (
                  <Link
                    component="button"
                    variant="body1"
                    onClick={() => {
                      setId(rowData.id)
                      setTitle(rowData.title)
                      setAuthor(rowData.author)
                      setDescription(rowData.description)
                    }}
                  >
                  {rowData.title}
                  </Link>
                )
              },
              {
                title: 'Author',
                field: 'author'
              }
            ]}
            data={data}
            title="My Books"
            options={{
              filtering: true
            }}
          />
         </div>
      </div>
    </div>
  );
}

export default App;
