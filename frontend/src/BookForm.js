import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import axios from 'axios'
import Stack from '@mui/material/Stack'

export default function BookForm(args) {
  const id = args.data.id
  const [title, setTitle] = React.useState(args.data.title)
  const [author, setAuthor] = React.useState(args.data.author)
  const [description, setDescription] = React.useState(args.data.description)

  const handleAdd = async () => {
    const book = { title: title, author: author, description: description }
    await axios.post(`/api/add_book/`, book, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'same-origin'
    }).then(response => console.log(response.data))
    args.close()
  }

  const handleEdit = async () => {
    const book = { title: title, author: author, description: description }
    await axios.post(`/api/edit_book/${id}`, book, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'same-origin'
    }).then(response => console.log(response.data))
    args.close()
  }

  const handleDelete = async () => {
    await axios.delete(`/api/delete_book/${id}`)
      .then(response => console.log(response.data))
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <div className="Form-input">
        <TextField 
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={event => {
            const { value } = event.target
            setTitle(value)
          }}
        />
      </div>
      <div className="Form-input">
        <TextField 
          id="outlined-basic"
          label="Author"
          variant="outlined"
          value={author}
          onChange={event => {
            const { value } = event.target
            setAuthor(value)
          }}
        />
      </div>
      <div className="Form-input">
        <TextField 
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={event => {
            const { value } = event.target
            setDescription(value)
          }}
        />
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => { handleAdd() }}>Save New</Button>
        <Button variant="contained" onClick={() => { handleEdit() }}>Save</Button>
        <Button variant="contained" onClick={() => { handleDelete() }}>Delete</Button>
      </Stack>
      </div>
    </Box>
  );
}