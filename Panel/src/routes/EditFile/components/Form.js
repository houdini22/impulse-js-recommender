import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Field } from 'redux-form'
import { Button, Row, Col } from 'reactstrap'
import { TextField, Fieldset, Checkbox, FilePreview } from 'components'
import styles from './EditFile.module.scss'

export class Form extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
    fileInfo: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      hasHeaderRow: false,
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    const { file } = nextProps
    if (file && Object.keys(this.props.file).length === 0) {
      if (file.hasHeaderRow) {
        this.setState({
          hasHeaderRow: true,
        })
      }
    }
  }

  render () {
    const {
      handleSubmit,
      fileInfo,
    } = this.props
    const { hasHeaderRow } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <FilePreview
          fileInfo={fileInfo}
          highlightFirstRow={hasHeaderRow}
        />
        <Fieldset title='File properties'>
          <div>
            <Field
              name='hasHeaderRow'
              component={Checkbox}
              type='checkbox'
              label='File contains header row?'
              onChange={(e, value) => {
                this.setState({ hasHeaderRow: value })
              }}
            />
            <Field
              name='name'
              component={TextField}
              type='text'
              label='Name'
            />
          </div>
        </Fieldset>
        <Row className='buttons-row'>
          <Col md={12}>
            <div className='text-right'>
              <Button type='submit' color='success'>Save</Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default CSSModules(Form, styles)
