import React from "react"
import styled from "styled-components"
import Icon from "@mdi/react"
import { mdiCameraControl } from "@mdi/js"

import colors from "/src/presets/colors"

const SectionElement = styled.div`
	display: flex;
	flex-direction: column;
`

const SectionLabelElement = styled.span`
	font-size: 14px;
	font-weight: 700;
`

const SectionContentsElement = styled.span`
	margin-top: 12px;
`

function Section({ label, children }) {
	return (
		<SectionElement>
			<SectionLabelElement>{label}</SectionLabelElement>
			<SectionContentsElement>{children}</SectionContentsElement>
		</SectionElement>
	)
}

const PlayerElement = styled.a.attrs({
	target: "_blank",
})`
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	user-select: none;
	border-radius: 4px;
	height: 38px;
	padding: 0 10px 0 12px;

	:hover {
		background: rgba(0, 0, 0, 0.1);
	}
`

const PlayerNameElement = styled.span`
	font-size: 16px;
	font-weight: ${props => props.emphasized ? 700 : 400};
	color: ${props => props.emphasized ? colors.brand[600] : "black"};
`

const PlayerBreadcrumbElement = styled.span`
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	margin-left: 6px;
	color: white;
	border-radius: 3px;
	background: ${colors.brand[600]};
	padding: 2px 5px;
`

const PlayerSpacerElement = styled.div`
	flex-grow: 1;
`

const PlayerButtonsElement = styled.div`
	flex-direction: row;
`

const PlayerButtonElement = styled.span`
	user-select: none;
	cursor: pointer;
	opacity: 0;

	${PlayerElement}:hover & {
		opacity: 0.5;
	}

	&:hover {
		opacity: 1 !important;
	}
`

function Player({ player, emphasized, breadcrumb }) {
	return (
		<PlayerElement href={`https://www.roblox.com/users/${player.id}/profile`}>
			<PlayerNameElement emphasized={emphasized}>{player.name}</PlayerNameElement>
			{ breadcrumb ? <PlayerBreadcrumbElement>{breadcrumb}</PlayerBreadcrumbElement> : null }
			<PlayerSpacerElement />
			<PlayerButtonsElement>
				<PlayerButtonElement
					onClick={(event) => {
						// TODO: Move camera to player (requires context)
						event.preventDefault()
					}}
				>
					<Icon
						path={mdiCameraControl}
						size={1}
						color="black"
					/>
				</PlayerButtonElement>
			</PlayerButtonsElement>
		</PlayerElement>
	)
}

const ServerTabElement = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

function ServerTab({ snapshot, report }) {
	return (
		<ServerTabElement>
			<Section label="Players">
				{
					Object.values(snapshot.players).map((player) => {
						let breadcrumb

						if (report) {
							if (player.id === report.target.id) {
								breadcrumb = "Target"
							} else if (player.id === report.from.id) {
								breadcrumb = "Source"
							}
						}

						return <Player
							key={player.id}
							player={player}
							emphasized={report ? report.target.id == player.id : false}
							breadcrumb={breadcrumb}
						/>
					})
				}
			</Section>
		</ServerTabElement>
	)
}

export default ServerTab

export {
	SectionElement,
	SectionLabelElement,
	SectionContentsElement,

	PlayerElement,
	PlayerNameElement,
	PlayerBreadcrumbElement,
	PlayerSpacerElement,
	PlayerButtonsElement,
	PlayerButtonElement,

	ServerTabElement,
}