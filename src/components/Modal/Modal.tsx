import ReactDOM from 'react-dom';
import { ModalProps } from '../../interfaces';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        (
            <div className="fixed inset-0 backdrop-blur-md bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white py-5 px-10 flex flex-col justify-center items-center rounded-xl gap-5 w-auto">
                    {children}
                    <button onClick={onClose} className="px-4 py-2 font-medium bg-red-500 text-white rounded hover:bg-red-700 transition-all ease-in-out duration-300">
                        TRY AGAIN
                    </button>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!
    );
}