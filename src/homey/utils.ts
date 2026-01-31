import {Device} from 'homey';

export async function updateCapability(device: Device, id: string, newValue: any) {
    device.log('updateCapability: ' + id)
    if (newValue !== undefined) {
        if (!device.hasCapability(id)) {
            await device.addCapability(id);
        }

        if (newValue !== device.getCapabilityValue(id)) {
            device.log(device.getName() + ', setting new value for capability ' + id + ', value = ' + newValue);
            await device.setCapabilityValue(id, newValue);
        }
        else {
            device.log(device.getName() + ', skipping new value for capability ' + id);
        }
    }
    else {
        if (device.hasCapability(id)) {
            await device.removeCapability(id);
        }
    }
}
