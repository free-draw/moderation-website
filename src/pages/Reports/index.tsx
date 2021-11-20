import React from "react"
import { useRouteMatch } from "react-router"
import styled from "styled-components"
import { getReport, Report, ReportStatus } from "@free-draw/moderation-client"
import PageComponent from "../../components/Page"
import SnapshotViewerComponent from "../../components/SnapshotViewer"
import ListComponent from "./List"
import DetailsComponent from "./Details"
import ActionsComponent from "./Actions"
import API from "../../API"

const ReportsPageElement = styled(PageComponent)`
	height: 100%;
`

const SnapshotViewerElement = styled(SnapshotViewerComponent)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

function ReportsPageComponent() {
	const match = useRouteMatch<{
		id: string,
	}>("/reports/:id")
	const id = match ? match.params.id : null

	const [ report, setReport ] = React.useState<Report | null>(null)
	React.useEffect(() => {
		if (id) {
			getReport(API, id).then(setReport)
		} else {
			setReport(null)
		}
	}, [ id ])

	return (
		<ReportsPageElement>
			<SnapshotViewerElement
				id={report ? report.snapshot!.id : null}
				report={report}
				placeholder={{
					text: "No report selected",
					subtext: "Click on a report to get started!",
				}}
			/>
			<ListComponent />
			{report ? <DetailsComponent report={report} /> : null}
			{report && report.status === ReportStatus.PENDING ? <ActionsComponent report={report} /> : null}
		</ReportsPageElement>
	)
}

export default ReportsPageComponent

export {
	ReportsPageElement,
	SnapshotViewerElement,
}