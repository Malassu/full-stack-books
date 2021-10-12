import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { tableIcons } from './tableIcons'
import './App.css'
import Button from '@mui/material/Button'
import axios from 'axios'
import BookForm from './BookForm'


function App() {
  const [data, setData] = useState([])
  const [activeData, setActiveData] = useState({
    id: null,
    title: '',
    author: '',
    description: ''
  })

  useEffect(() => {
    axios.get('/api/get_events')
        .then(response => setData(response.data.results))
  })

  return (
    <div className="App">
      <header className="App-header">
        My Bookshelf
      </header>
      <div className="Main">
        <div style={{ paddingRight: '20px', width: '50%' }}>
          <BookForm data={activeData} />
        </div>
        <div style={{ paddingTop: '10px', maxWidth: '45%' }}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              {
                title: 'Title',
                field: 'title',
                render: rowData => (
                  <Button
                    variant="text"
                    onClick={() => {
                        setActiveData(rowData)
                      }
                    }
                  >
                  {rowData.title}
                  </Button>
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
