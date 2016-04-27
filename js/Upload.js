/*
 * spa.upload.js
 *   Handle uplads of new images
 */

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import DropZoneComponent from 'react-dropzone-component'

  // begin local variables
let
  // Configuration and setup for DropZoneComponent
  componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif', 'tif'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8111/uploadHandler/'
  },
  eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
    },
    djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif,image/tiff"
    };

    // Thanks to James R. Nelson whose tutorial was the inspiration for this section
    //  http://jamesknelson.com/learn-raw-react-ridiculously-simple-forms/
    let RecordItem = React.createClass({
      propTypes: {
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        filename: React.PropTypes.string.isRequired,
        source: React.PropTypes.string,
        tags: React.PropTypes.string
      },
      render: function() {
        return (
          React.createElement('li', {className: 'RecordItem'},
          React.createElement('h5', {className: 'RecordItem-title'}, this.props.title),
          React.createElement('h5', {className: 'RecordItem-description'}, this.props.description),
          React.createElement('h5', {className: 'RecordItem-filename'}, this.props.filename),
          React.createElement('h5', {className: 'RecordItem-source'}, this.props.source),
          React.createElement('h5', {className: 'RecordItem-tags'}, this.props.tags)
          )
        );
      },
    });

    let RecordForm = React.createClass({
      propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
      },
      onTitleChange: function(e) {
        console.log('Made it to callback with: ' + e.target.value);
        this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}));
        console.log('Change complete: ' + JSON.stringify(this.props.value));
      },
      onDescriptionChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
      },
      onFilenameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {filname: e.target.value}));
      },
      onSourceChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {source: e.target.value}));
      },
      onTagsChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {tags: e.target.value}));
      },
      onSubmit: function(e) {
        e.preventDefault();
        this.props.onSubmit();
      },
      render: function() {
        return (
          React.createElement('form', {
              className: 'RecordForm', onSubmit:this.onSubmit,
              noValidate: true},
            React.createElement('input', {
              type: 'text',
              placeholder: 'Title (required)',
              value: this.props.value.title,
              onChange: this.onTitleChange,
            }),
            React.createElement('input', {
              type: 'text',
              placeholder: 'Description',
              value: this.props.value.description,
              onChange: this.onDescriptionChange,
            }),
            React.createElement('input', {
              type: 'text',
              placeholder: 'Filename (required)',
              value: this.props.value.filename,
              onChange:this.onFilenameChange,
            }),
            React.createElement('input', {
              type: 'text',
              placeholder: 'Source',
              value: this.props.value.source,
              onChange: this.onSourceChange,
            }),
            React.createElement('textarea', {
              placeholder: 'Tags',
              value: this.props.value.tags,
              onChange: this.onTagsChange,
            }),
            React.createElement('button', {type: 'submit'}, "Add Record")
          )
        );
      },
    });

    let RecordView = React.createClass({
      propTypes: {
        records: React.PropTypes.array.isRequired,
        newRecord: React.PropTypes.object.isRequired,
        onNewRecordChange: React.PropTypes.func.isRequired,
        onNewRecordSubmit: React.PropTypes.func.isRequired,
      },
        render: function() {
          var recordItemElements = this.props.records
            .filter(function(record) { return record.title; })
            .map(function(record) { return React.createElement(RecordItem, record); });
          return (
            React.createElement('div', {className: 'RecordView'},
            React.createElement('h1', {className: 'RecordView-title'}, "Records"),
            React.createElement('ul', {className: 'RecordView-list'}, recordItemElements),
            React.createElement(RecordForm, {
              value: this.props.newRecord,
              onChange: this.props.onNewRecordChange,
              onSubmit: this.props.onNewRecordSubmit,
            })
          )
        );
      },
  });


  /*
    * Model
  */
  function updateNewRecord(record) {
    console.log('Officially changing our record' + JSON.stringify(record));
    Object.assign( newRecord, record)
    //setState({ newRecord: record });
    console.log('So heres the proof' + JSON.stringify(newRecord));
  }

  let state = {};

  let  RECORD_TEMPLATE = { title: "", description: "", filename: "", source: "", tags: "", errors: null};

/*
  let  records = [
    {key: 1, title: "Image 1", description: "An image", filename: "123.jpg", source: "Brian", tags: "Medaryville"},
    {key: 2, title: "Image 2", filename: "456.tif"},
    {key: 3, title: "Image 3", filename: "789.png"},
  ];

  let newRecord = { title: "", description: "", filename: "", source: "", tags: "" };
*/

  function submitNewRecord() {
    var record = Object.assign({}, state.newRecord, {key: state.records.length + 1, errors:{}});
    console.log('Submitting new record');
    if (record.title && record.filename) {
      setState(
        Object.keys(record.errors).length === 0
        ? {
            newRecord: Object.assign({}, RECORD_TEMPLATE),
            records: state.records.slice(0).concat(record),
          }
          : { newRecord: record }
        );
      }
    }
/*
  React.createElement(RecordView, {
      records: records,
      newRecord: newRecord,
      onNewRecordChange: updateNewRecord,
    });

  React.createElement(RecordView, Object.assign({}, state, {
    onNewContactChange: updateNewContact,
  }))
*/

function setState(changes) {
  console.log('In setState about to assign ' + JSON.stringify(changes));
  Object.assign(state, changes);
  console.log('In setState about to assign ' + JSON.stringify(state));
}

// Temporary workaround since we can't do this (yet) with setState
let records = [
  {key: 1, title: "Image 1", description: "An image", filename: "123.jpg", source: "Brian", tags: "Medaryville"},
  {key: 2, title: "Image 2", filename: "456.tif"},
  {key: 3, title: "Image 3", filename: "789.png"},
];

let newRecord = { title: "Foo", description: "Bar", filename: "1.jpg", source: "Me", tags: "You" };

let FormBox =  React.createClass ({
  render() {
    return (
      <div id="record-container">
      </div>
    );
  }
});

  class Upload extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <RecordView
            records={records}
            newRecord={newRecord}
            onNewRecordChange={updateNewRecord}
            onNewRecordSubmit={submitNewRecord}
            />
          <DropZoneComponent  config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />,
        </div>
      );
    }
  }

export default Upload

/*
let setState = function(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(RecordView, Object.assign({}, state, {
      onNewRecordChange: updateNewRecord,
    }))
  );
}

setState({
  records: [
  {key: 1, title: "Image 1", description: "An image", filename: "123.jpg", source: "Brian", tags: "Medaryville"},
  {key: 2, title: "Image 2", filename: "456.tif"},
  {key: 3, title: "Image 3", filename: "789.png"},
],

  newRecord: {title: "", description: "", filename: "", source: "", tags: ""}
}
);

*/
