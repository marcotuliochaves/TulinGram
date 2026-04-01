import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

// 🔥 HELPER (NOVO)
const getImageUrl = (image, type) => {
  if (!image) return "";

  return image.startsWith("http")
    ? image
    : `${uploads}/${type}/${image}`;
};

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
      dispatch(getUserPhotos(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!showModal) {
      setTitle("");
      setImage("");
      setPreviewImage("");
    }
  }, [showModal]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    dispatch(publishPhoto(formData));

    setTitle("");
    resetComponentMessage();
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));
    resetComponentMessage();
  };

  const handleEdit = (photo) => {
    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
    setIsEditing(true);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img
            src={getImageUrl(user.profileImage, "users")}
            alt={user.name}
          />
        )}

        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      {id === userAuth._id && (
        <>
          {isEditing && (
            <div className="edit-photo">
              <p>Editando:</p>

              {editImage && (
                <img
                  src={getImageUrl(editImage, "photos")}
                  alt={editTitle}
                />
              )}

              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="Insira o novo título"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />
                <input type="submit" value="Atualizar" />

                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar edição
                </button>
              </form>
            </div>
          )}

          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}

      <div className="user-photos">
        <h2>Fotos publicadas:</h2>

        <div className="photos-container">
          {id === userAuth._id && (
            <div
              className="photo add-photo"
              onClick={() => setShowModal(true)}
            >
              <span className="plus-icon">+</span>
            </div>
          )}

          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={getImageUrl(photo.image, "photos")}
                    alt={photo.title}
                  />
                )}

                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>

                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}

          {photos.length === 0 && (
            <p>Ainda não há fotos publicadas</p>
          )}
        </div>

        {showModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              <h3>Compartilhe um momento:</h3>

              <form onSubmit={submitHandle}>
                <label>
                  <span>Título:</span>
                  <input
                    type="text"
                    placeholder="Insira um título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                  />
                </label>

                <label>
                  <span>Imagem:</span>
                  <div
                    className="drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <p>Arraste uma imagem aqui ou clique para selecionar</p>

                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFile}
                    />
                  </div>
                </label>

                {previewImage && (
                  <div className="image-preview">
                    <p>Prévia da imagem:</p>
                    <img src={previewImage} alt="Prévia" />
                  </div>
                )}

                {!loadingPhoto && (
                  <input type="submit" value="Postar" />
                )}

                {loadingPhoto && (
                  <input type="submit" disabled value="Aguarde..." />
                )}

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;