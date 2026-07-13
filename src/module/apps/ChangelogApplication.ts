import { FLAGS, SR5_APPV2_CSS_CLASS, SYSTEM_NAME } from '../constants';

import ApplicationV2 = foundry.applications.api.ApplicationV2;
import HandlebarsApplicationMixin = foundry.applications.api.HandlebarsApplicationMixin;

export class ChangelogApplication extends HandlebarsApplicationMixin(ApplicationV2) {
    static override PARTS = {
        main: {
            template: 'systems/shadowrun5e/dist/templates/apps/changelog.hbs',
        },
    };

    static override DEFAULT_OPTIONS = {
        id: 'shadowrun5e-changelog',
        classes: [SR5_APPV2_CSS_CLASS, 'shadowrun5e'],
        position: {
            width: 500,
            height: 'auto' as const,
        },
        window: {
            resizable: true,
        },
    };

    override get title(): string {
        return game.i18n.localize('SR5.ChangelogApplication.Title');
    }

    protected override async _onRender(
        context: Parameters<ApplicationV2['_onRender']>[0],
        options: Parameters<ApplicationV2['_onRender']>[1],
    ) {
        await game.user?.setFlag(SYSTEM_NAME, FLAGS.ChangelogShownForVersion, game.system.version);
        return super._onRender(context, options);
    }

    static get showApplication(): boolean {
        if (!game.user?.isGM || !game.user.isTrusted) return false;

        const shownForVersion = game.user.getFlag(SYSTEM_NAME, FLAGS.ChangelogShownForVersion);
        return shownForVersion !== game.system.version;
    }
}
