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
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect } from 'react';

type TArticalParamsFormProps = {
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: TArticalParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const onClickArrowButtonHandler = () => {
		setIsOpen(!isOpen);
	};

	const onReset = (e: React.FormEvent) => {
		e.preventDefault(); // предотвращаем стандартный сброс формы, чтобы управлять состоянием вручную
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		setArticleState(defaultArticleState);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState({
			fontSizeOption: fontSize,
			fontFamilyOption: fontFamily,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={onClickArrowButtonHandler} isOpen={isOpen} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onReset={onReset} onSubmit={onSubmit}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setContentWidth}
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
