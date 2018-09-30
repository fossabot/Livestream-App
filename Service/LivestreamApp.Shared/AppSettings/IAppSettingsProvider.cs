﻿namespace LivestreamApp.Shared.AppSettings
{
    public interface IAppSettingsProvider
    {
        int GetIntValue(AppSetting setting);
        string GetStringValue(AppSetting setting);
        void SetStringValue(AppSetting setting, string newValue);
    }
}
