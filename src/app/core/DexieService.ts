import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('WfHelpTable');
        this.version(1).stores({
            wf: '++id, objekt, obj_bezeichnung, untertitel, aschlussel, ausgbez, fortschritt',
        });
    }
}
