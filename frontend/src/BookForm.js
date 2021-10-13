import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import { Paper } from '@material-ui/core'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export default function BookForm(args) {

  const [titleError, setTitleError] = React.useState('')
  const [submitError, setSubmitError] = React.useState('')
  const [msg, setMsg] = React.useState('')

  const clearForm = () => {
    args.setId(null)
    args.setTitle('')
    args.setAuthor('')
    args.setDescription('')
    setMsg('')
    setTitleError('')
    setSubmitError('')
  }

  const catchResponse = (responseData, update) => {
    if (responseData.success) {
      args.setId(responseData.result?.id)
      setTitleError('')
      setSubmitError('')
      if (update) setMsg('Update successful!')
      else setMsg('')
    } else {
      setSubmitError(responseData.msg)
    }
  }

  const catchDelete = (responseData) => {
    if (responseData.success) {
      setTitleError('')
      setSubmitError('')
    } else {
      setSubmitError(responseData.msg)
    }
  }

  const handleAdd = async () => {
    setMsg('')
    if (!args.title) {
      setTitleError('Book title must not be empty!')
      return
    }
    const book = { title: args.title, author: args.author, description: args.description }
    await axios.post(`/api/add_book`, book, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'same-origin'
    }).then(response => catchResponse(response.data, false))
    args.submitCallback()
  }

  const handleEdit = async () => {
    setMsg('')
    if (!args.title) {
      setTitleError('Book title must not be empty!')
      return
    }
    const book = { title: args.title, author: args.author, description: args.description }
    await axios.put(`/api/edit_book/${args.id}`, book, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'same-origin'
    }).then(response => catchResponse(response.data, true))
    args.submitCallback()
  }

  const handleDelete = async () => {
    setMsg('')
    await axios.delete(`/api/delete_book/${args.id}`)
      .then(response => catchDelete(response.data))
    args.submitCallback()
    clearForm()
  }

  return (
    <Paper>
    <div>
      <div className="Form-input">
        <TextField 
          id="outlined-basic"
          label="Title *"
          variant="outlined"
          error={titleError}
          style={{ width: '80%' }}
          value={args.title}
          onChange={event => {
            const { value } = event.target
            args.setTitle(value)
          }}
        />
      </div>
      <div className="Form-input">
        <TextField 
          id="outlined-basic"
          label="Author"
          variant="outlined"
          value={args.author}
          style={{ width: '80%' }}
          onChange={event => {
            const { value } = event.target
            args.setAuthor(value)
          }}
        />
      </div>
      <div className="Form-input">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Description"
          style={{ width: '80%' }}
          value={args.description}
          onChange={event => {
            const { value } = event.target
            args.setDescription(value)
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => { handleAdd() }}>Save New</Button>
        {args.id ? <Button variant="contained" onClick={() => { handleEdit() }}>Save</Button> : <Button disabled={true}>Save</Button>}
        {args.id ? <Button variant="contained" onClick={() => { handleDelete() }}>Delete</Button> : <Button disabled={true}>Delete</Button>}
      </Stack>
      </div>
        {msg ? <p style={{ color: 'green', paddingBottom: '10px' }}>{msg}</p> : <p></p>}
        {titleError ? <p style={{ color: 'red', paddingBottom: '10px' }}>{titleError}</p> : <p></p>}
        {submitError ? <p style={{ color: 'red', paddingBottom: '10px' }}>{submitError}</p> : <p></p>}
      </div>
    </Paper>
  );
}