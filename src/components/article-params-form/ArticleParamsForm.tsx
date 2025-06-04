import { clsx } from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onClickArrowButtonHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={onClickArrowButtonHandler} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						selected={fontFamilyOptions[0]}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						title='Размер'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
					/>
					<Select
						selected={fontColors[0]}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColors[0]}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidthArr[0]}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
