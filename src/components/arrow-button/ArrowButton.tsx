import { clsx } from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { FC, KeyboardEvent } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton: FC<ArrowButtonProps> = ({ onClick, isOpen }) => {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		// Активируем onClick при нажатии Enter или Space (как у нативной кнопки)
		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	};

	return (
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0} // tabIndex="0" делает элемент фокусируемым
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
