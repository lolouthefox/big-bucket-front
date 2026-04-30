import axios from 'axios';

type ServerVersion = Record<
	string,
	{
		url: string[];
		sha256: string;
		loader_version?: string;
	}
>;

type ServerType = Record<
	string,
	{
		versions: ServerVersion;
	}
>;

export interface ServerCategory {
	enabled: boolean;
	friendly_name: string;
	types: ServerType;
}

export interface Manifest {
	manifest_version: number;
	mc_java_servers: ServerCategory;
	mc_java_proxies: ServerCategory;
}

export async function getManifest(): Promise<Manifest> {
	const manifestURL = 'https://jars.arcadiatech.org/manifest.json';

	const response = await axios.get(manifestURL);
	if (response.status != 200) throw new Error(`Response status: ${response.status}`);

	return response.data;
}
