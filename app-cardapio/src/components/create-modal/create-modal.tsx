import { useEffect, useState } from 'react'
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';
import { AiFillCloseCircle } from 'react-icons/ai'
import './create-modal.css'

interface InputProps {
    label: string,
    value: string | number,
    required: boolean,
    type: string,
    maxlength: number,
    updateValue(value: any): void

}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue, required, type, maxlength }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input type={type} value={value} maxLength={maxlength} onChange={e => updateValue(e.target.value)} required={required} />
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)

    }

    useEffect(() => {
        if (!isSuccess) return
        closeModal()
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="header">
                    <h2>Cadastrar novo item</h2>
                    <div className="close">
                        <AiFillCloseCircle className="close" onClick={closeModal} size={24} />
                    </div>
                </div>
                <form className="input-container" onSubmit={submit}>
                    <Input maxlength={250} type='text' required label="Título" value={title} updateValue={setTitle} />
                    <Input maxlength={10} type='number' required label="Preço" value={price} updateValue={setPrice} />
                    <Input maxlength={250} type='text' required label="Imagem" value={image} updateValue={setImage}/>
                    <button className="btn-secondary">Adicionar</button>
                </form>
            </div>
        </div>
    )
}