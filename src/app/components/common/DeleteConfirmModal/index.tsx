import { FC, ReactElement } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from '@nextui-org/react';

interface IDeleteConfirmModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}
export const DeleteConfirmModal: FC<IDeleteConfirmModalProps> = (props): ReactElement => {
    const { onDelete, title, onClose, isOpen } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <p>آیا از حذف این مورد اطمینان دارید؟</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onDelete}>
                                تایید
                            </Button>
                            <Button color="default" variant="light" onPress={onClose}>
                                بازگشت
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
