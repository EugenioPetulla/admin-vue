import { apiClient, tryRequest } from '@/api'
import type { JSONSettings } from '@models/JSONSchema'

/*
 * This is a service that is used to get the list of plugins active on the Cheshire Cat.
 * It can also toggle them according to the user's choice.
 */
const PluginService = Object.freeze({
	getPlugins: async () => {
		return await tryRequest(
			apiClient.value?.api?.plugins.listAvailablePlugins(),
			'Getting all the available plugins',
			'Unable to fetch the plugins',
		)
	},
	getPluginsSettings: async () => {
		return await tryRequest(
			apiClient.value?.api?.plugins.getPluginsSettings(),
			`Getting plugins settings`,
			`Unable to get plugins settings`,
		)
	},
	getSinglePluginSettings: async (id: string) => {
		const result = await tryRequest(
			apiClient.value?.api?.plugins.getPluginSettings(id),
			`Getting plugin ${id} settings`,
			`Unable to get plugin ${id} settings`,
		)
		return result.data
	},
	togglePlugin: async (id: string) => {
		return await tryRequest(
			apiClient.value?.api?.plugins.togglePlugin(id),
			`Toggle plugin ${id}`,
			`Unable to toggle plugin ${id}`,
		)
	},
	updateSettings: async (id: string, settings: JSONSettings) => {
		return await tryRequest(
			apiClient.value?.api?.plugins.upsertPluginSettings(id, settings),
			`Updated plugin ${id} settings`,
			`Unable to update plugin ${id} settings`,
		)
	},
	deletePlugin: async (id: string) => {
		return await tryRequest(
			apiClient.value?.api?.plugins.deletePlugin(id),
			`Deleted plugin ${id}`,
			`Unable to delete plugin ${id}`,
		)
	},
	sendFile: async (file: File) => {
		return await tryRequest(
			apiClient.value?.api?.plugins.installPlugin({ file }),
			`Plugin ${file.name} installed successfully!`,
			`Unable to install the plugin ${file.name}`,
		)
	},
})

export default PluginService
