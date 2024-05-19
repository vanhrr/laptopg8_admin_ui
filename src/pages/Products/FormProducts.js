/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import { v4 } from 'uuid';

import { getall } from '~/ultils/services/categoriesService';
import { create, getbyid, update } from '~/ultils/services/productService';
import { getCookie } from '~/ultils/cookie';

function FormProducts({ onClose, title, onSuccess, id }) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [titlex, setTitlex] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [cpu, setCpu] = useState('');
    const [ram, setRam] = useState('');
    const [rom, setRom] = useState('');
    const [display, setDisplay] = useState('');
    const [card, setCard] = useState('');
    const [gate, setGate] = useState('');
    const [os, setOs] = useState('');
    const [design, setDesign] = useState('');
    const [wxh, setWxh] = useState('');
    const [since, setSince] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchCate = async () => {
            try {
                const response = await getall('', '');
                setCategories(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCate();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await getbyid(id);
                    const data = response.data[0];
                    setCategory(data.category_id);
                    setTitlex(data.title);
                    setColor(data.color);
                    setPrice(data.price);
                    setQuantity(data.amount);
                    setShortDescription(data.summary);
                    setImage(data.avatar);
                    setStatus(data.status);
                    const other = data.content;
                    setContent(data.content);
                    const data_other = other.split('*||*');
                    setCpu(data_other[0]);
                    setRam(data_other[1]);
                    setRom(data_other[2]);
                    setDisplay(data_other[3]);
                    setCard(data_other[4]);
                    setGate(data_other[5]);
                    setOs(data_other[6]);
                    setDesign(data_other[7]);
                    setWxh(data_other[8]);
                    setSince(data_other[9]);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        const wall = '*||*';
        setContent(
            cpu +
                wall +
                ram +
                wall +
                rom +
                wall +
                display +
                wall +
                card +
                wall +
                gate +
                wall +
                os +
                wall +
                design +
                wall +
                wxh +
                wall +
                since,
        );
    }, [cpu, ram, rom, display, card, gate, os, design, wxh, since]);

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleTitleChange(event) {
        setTitlex(event.target.value);
    }

    function handleColorChange(event) {
        setColor(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleShortDescriptionChange(event) {
        setShortDescription(event.target.value);
    }

    function handleCpuChange(event) {
        setCpu(event.target.value);
    }

    function handleRamChange(event) {
        setRam(event.target.value);
    }

    function handleRomChange(event) {
        setRom(event.target.value);
    }

    function handleDisplayChange(event) {
        setDisplay(event.target.value);
    }

    function handleCardChange(event) {
        setCard(event.target.value);
    }

    function handleGateChange(event) {
        setGate(event.target.value);
    }

    function handleOsChange(event) {
        setOs(event.target.value);
    }

    function handleDesignChange(event) {
        setDesign(event.target.value);
    }

    function handleWxhChange(event) {
        setWxh(event.target.value);
    }

    function handleSinceChange(event) {
        setSince(event.target.value);
    }

    function handleStatusChange(event) {
        setStatus(event.target.value);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!category || !titlex || !image || !price || !quantity) {
            alert('Vui lòng nhập đủ thông tin danh mục, tên sản phẩm, hình ảnh, giá bán, số lượng');
            return;
        }
        if (id) {
            const data = {
                id: id,
                category_id: category,
                title: titlex,
                avatar: image,
                color: color,
                price: price,
                amount: quantity,
                summary: shortDescription,
                content: content,
                status: status,
            };
            const fetchAPI = async () => {
                try {
                    const response = await update(data);
                    console.log(response);
                    onSuccess(response.status);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchAPI();
        } else {
            const data = {
                admin_id: getCookie('login').id,
                category_id: category,
                title: titlex,
                avatar: image,
                color: color,
                price: price,
                amount: quantity,
                summary: shortDescription,
                content: content,
                status: 1,
            };

            const fetchAPI = async () => {
                try {
                    const response = await create(data);
                    onSuccess(response.status);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchAPI();
        }

        onClose();
    }

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="form">
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                            <option value="">Chọn Danh Mục</option>
                            {categories.map((cate) =>
                                cate.type === 0 ? (
                                    <option key={v4()} value={cate.id}>
                                        {cate.name}
                                    </option>
                                ) : null,
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="title">
                        <Form.Label>Tên Sản Phẩm</Form.Label>
                        <Form.Control type="text" value={titlex} onChange={handleTitleChange} />
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Trạng Thái</Form.Label>
                        <Form.Control as="select" value={status} onChange={handleStatusChange}>
                            <option value="1">Enable</option>
                            <option value="0">Disable</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="color">
                        <Form.Label>Màu sắc (Mã màu)</Form.Label>
                        <Form.Control type="color" value={color} onChange={handleColorChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control type="number" value={price} onChange={handlePriceChange} />
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                    </Form.Group>

                    <Form.Group controlId="shortDescription">
                        <Form.Label>Mô tả ngắn</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={shortDescription}
                            onChange={handleShortDescriptionChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="cpu">
                        <Form.Label>CPU:</Form.Label>
                        <Form.Control type="text" value={cpu} onChange={handleCpuChange} />
                    </Form.Group>

                    <Form.Group controlId="ram">
                        <Form.Label>RAM:</Form.Label>
                        <Form.Control type="text" value={ram} onChange={handleRamChange} />
                    </Form.Group>

                    <Form.Group controlId="rom">
                        <Form.Label>Ổ cứng:</Form.Label>
                        <Form.Control type="text" value={rom} onChange={handleRomChange} />
                    </Form.Group>

                    <Form.Group controlId="display">
                        <Form.Label>Màn hình: </Form.Label>
                        <Form.Control type="text" value={display} onChange={handleDisplayChange} />
                    </Form.Group>

                    <Form.Group controlId="card">
                        <Form.Label>Card màn hình: </Form.Label>
                        <Form.Control type="text" value={card} onChange={handleCardChange} />
                    </Form.Group>

                    <Form.Group controlId="gate">
                        <Form.Label>Cổng kết nối: </Form.Label>
                        <Form.Control type="text" value={gate} onChange={handleGateChange} />
                    </Form.Group>

                    <Form.Group controlId="os">
                        <Form.Label>Hệ điều hành: </Form.Label>
                        <Form.Control type="text" value={os} onChange={handleOsChange} />
                    </Form.Group>

                    <Form.Group controlId="design">
                        <Form.Label>Thiết kế: </Form.Label>
                        <Form.Control type="text" value={design} onChange={handleDesignChange} />
                    </Form.Group>

                    <Form.Group controlId="wxh">
                        <Form.Label>Kích thước, khối lượng: </Form.Label>
                        <Form.Control type="text" value={wxh} onChange={handleWxhChange} />
                    </Form.Group>

                    <Form.Group controlId="since">
                        <Form.Label>Thời điểm ra mắt: </Form.Label>
                        <Form.Control type="text" value={since} onChange={handleSinceChange} />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormProducts;
