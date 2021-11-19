import React from "react"
import styled from "styled-components"
import IconButton, { IconButtonOptions } from "../../components/IconButton"
import TextButton from "../../components/TextButton"
import Spinner from "../../components/Spinner"
import ButtonStyle from "../../enum/ButtonStyle"

enum ContentSectionStatus {
	LOADED = "LOADED",
	LOADING = "LOADING",
	EMPTY = "EMPTY",
}

const ContentSectionStatusElement = styled.div`
	height: 80px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

const ContentSectionStatusEmptyElement = styled.span`
	color: rgba(0, 0, 0, 0.5);
	font-size: 16px;
	font-weight: 400;
`

function ContentSectionStatusDisplay({ status }: {
	status: ContentSectionStatus,
}) {
	switch (status) {
		case ContentSectionStatus.LOADED:
			return null

		case ContentSectionStatus.LOADING:
			return (
				<ContentSectionStatusElement>
					<Spinner />
				</ContentSectionStatusElement>
			)

		case ContentSectionStatus.EMPTY:
			return (
				<ContentSectionStatusElement>
					<ContentSectionStatusEmptyElement>There's nothing here.</ContentSectionStatusEmptyElement>
				</ContentSectionStatusElement>
			)
	}
}

const ContentSectionElement = styled.div`
	display: flex;
	flex-direction: column;
`

const ContentSectionHeaderElement = styled.div`
	height: 32px;
	width: 100%;
	display: flex;
	flex-direction: row;
`

const ContentSectionHeaderTextElement = styled.span`
	font-size: 24px;
	font-weight: 600;
`

const ContentSectionHeaderSpacerElement = styled.div`
	flex-grow: 1;
`

const ContentSectionHeaderButtonsElement = styled.div`
	flex-direction: row;

	> * + * {
		margin-left: 8px;
	}
`

const ContentSectionContainerElement = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
`

const ContentSectionFooterElement = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80px;
`

function ContentSection({ name, buttons, status, children }: {
	name: string,
	buttons: (IconButtonOptions & { id: string })[],
	status: ContentSectionStatus,
	children?: React.ReactNode[],
}) {
	const [ expanded, setExpanded ] = React.useState<boolean>(false)

	return (
		<ContentSectionElement>
			<ContentSectionHeaderElement>
				<ContentSectionHeaderTextElement>{name}</ContentSectionHeaderTextElement>
				<ContentSectionHeaderSpacerElement />
				<ContentSectionHeaderButtonsElement>
					{buttons.map(buttonData => <IconButton key={buttonData.id} {...buttonData} />)}
				</ContentSectionHeaderButtonsElement>
			</ContentSectionHeaderElement>
			<ContentSectionContainerElement>
				{
					children && children.length > 0 ? (
						expanded ? children : children.slice(0, 3)
					) : <ContentSectionStatusDisplay status={status} />
				}
				{
					children && children.length > 3 ? (
						<ContentSectionFooterElement>
							<TextButton
								text={expanded ? "Show Less" : "Show More"}
								style={ButtonStyle.FLAT}
								onClick={() => setExpanded(!expanded)}
							/>
						</ContentSectionFooterElement>
					) : null
				}
			</ContentSectionContainerElement>
		</ContentSectionElement>
	)
}

export default ContentSection

export {
	ContentSectionStatus,

	ContentSectionStatusElement,
	ContentSectionStatusEmptyElement,

	ContentSectionElement,
	ContentSectionHeaderElement,
	ContentSectionHeaderTextElement,
	ContentSectionHeaderSpacerElement,
	ContentSectionHeaderButtonsElement,
	ContentSectionContainerElement,
	ContentSectionFooterElement,
}