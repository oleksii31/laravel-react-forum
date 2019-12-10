import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Config from '../../../../Services/Config';

const Avatar = (props) => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => setFile(props.auth.avatar), []);

    function handleFileInputChange(event) {
        const image = event.target.files[0];

        _saveImage(image);
        _addToPreview(image);
    }

    function _saveImage(image) {
        let formData = new FormData();
        formData.append('avatar', image);

        axios.post(url(), formData)
        .then(({ data: avatar}) => {
            setFile(avatar.data.avatar)
        })
        .catch(error => {
           console.log(error);
        })

    }

    function url() {
        return Config.remoteBaseUrl+ `/me/avatar?token=${props.auth.token}`;
    }

    function _addToPreview(image) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setFile(reader.result), false);

        if(image) {
            reader.readAsDataURL(image);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center mb-2">
                <img src={ file } alt="" width="100" height="100"/>
            </div>
            <div className="flex justify-content-center">
                <input type="file" id="avatar" onChange={ handleFileInputChange } hidden/>
                <label className="btn btn-info mr-2 mt-2" htmlFor="avatar" style={{ cursor: "pointer" }}>
                    Upload <i className="fa fa-cloud-upload"/>
                </label>

                <button className="btn btn-danger">
                    <i className="fa fa-trash" />
                </button>
            </div>
        </>

    )
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Avatar);