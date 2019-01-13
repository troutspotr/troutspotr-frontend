import { createSelector } from 'reselect'
import { selectedStateSelector } from 'ui/core/Core.selectors';
import { UsStateFeature } from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON';

export interface IStateRegulationUrl {
  'stateName': string,
  'url': string,
  'phone': string,
}

const stateRegulationUrls = [
	{
		"stateName": "MN",
		"url": "https://files.dnr.state.mn.us/rlp/regulations/fishing/fishing_regs.pdf",
		"phone": "888-646-6367\r"
	},
	{
		"stateName": "IA",
		"url": "https://www.iowadnr.gov/Portals/idnr/uploads/fish/regs_fish.pdf",
		"phone": "515-725-8200\r"
	},
	{
		"stateName": "WI",
		"url": "https://dnr.wi.gov/topic/fishing/documents/regulations/TroutRegsFull1819Press.pdf",
		"phone": "1-888-936-7463\r"
	},
	{
		"stateName": "SD",
		"url": "https://drive.google.com/file/d/1FxWZUVCRlhyQonQKVRVv5zUZadDj1TEH/view?usp=sharing",
		"phone": null
	},
	{
		"stateName": "MT",
		"url": "http://fwp.mt.gov/fwpDoc.html?id=84724",
		"phone": null
	},
	{
		"stateName": "ID",
		"url": "https://idfg.idaho.gov/sites/default/files/seasons-rules-fish-2019-2021.pdf",
		"phone": null
	},
	{
		"stateName": "WA",
		"url": "https://wdfw.wa.gov/publications/01998/wdfw01998.pdf",
		"phone": null
	},
	{
		"stateName": "OR",
		"url": "http://www.eregulations.com/wp-content/uploads/2018/11/19ORFW.pdf",
		"phone": null
	},
	{
		"stateName": "CA",
		"url": "http://www.eregulations.com/wp-content/uploads/2018/03/18CAFW_LR.pdf",
		"phone": null
	},
	{
		"stateName": "NV",
		"url": "http://www.eregulations.com/wp-content/uploads/2018/02/18NVFW_LR2.pdf",
		"phone": null
	},
	{
		"stateName": "AZ",
		"url": "https://s3.amazonaws.com/azgfd-portal-wordpress/azgfd.wp/wp-content/uploads/2019/01/02144918/2019and2020-Fishing-Regs_web.pdf",
		"phone": null
	},
	{
		"stateName": "NM",
		"url": "http://www.wildlife.state.nm.us/download/publications/rib/2018/fishing/2018_19-New-Mexico-Fishing-Rules-And-Info.pdf",
		"phone": null
	},
	{
		"stateName": "UT",
		"url": "https://wildlife.utah.gov/guidebooks/2019_pdfs/2019_fishing.pdf",
		"phone": null
	},
	{
		"stateName": "CO",
		"url": "https://cpw.state.co.us/Documents/RulesRegs/Brochure/fishing.pdf",
		"phone": null
	},
	{
		"stateName": "WY",
		"url": "https://wgfd.wyo.gov/Regulations/Regulation-PDFs/WYFISHINGREGS_BROCHURE.pdf",
		"phone": null
	}
]

const stateDictionary = stateRegulationUrls.reduce((dictionary, item: IStateRegulationUrl) => {
	dictionary[item.stateName] = item
	return dictionary
}, {})

export const streamRegulationsForStateSelector = createSelector(
	selectedStateSelector,
	(selectedState: UsStateFeature): IStateRegulationUrl => {
		if (selectedState == null) {
			return null
		}

		return stateDictionary[selectedState.properties.short_name.toUpperCase()]
	}
)

export const streamRegulationsUrlSelector = createSelector(
	streamRegulationsForStateSelector,
	(selectedUrl) => {
		if (selectedUrl == null) {
			return null
		}

		return selectedUrl.url
	}
)
export const selectedstateNameSelector = createSelector(
	selectedStateSelector,
	(selectedState) => {
		if (selectedState == null) {
			return null
		}

		return selectedState.properties.name
	}
)
