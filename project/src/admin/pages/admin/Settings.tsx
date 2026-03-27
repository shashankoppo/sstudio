
import { useState, useEffect } from 'react';
import { Upload, Save, Check } from 'lucide-react';
import { api } from '../../lib/api';

export function Settings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        site_title: '',
        logo_url: '',
        hero_bg_url: ''
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [heroBgFile, setHeroBgFile] = useState<File | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await api.settings.get();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                resolve(result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const updates: any = { ...settings };

            if (logoFile) {
                updates.logo_url = await handleImageUpload(logoFile);
            }
            if (heroBgFile) {
                updates.hero_bg_url = await handleImageUpload(heroBgFile);
            }

            await api.settings.update(updates);
            setSettings(updates);
            setLogoFile(null);
            setHeroBgFile(null);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                <p className="text-gray-600 mt-1">Manage global website configuration</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* General Settings */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">General</h2>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                                <input
                                    type="text"
                                    value={settings.site_title}
                                    onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo Settings */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Branding</h2>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                                <div className="flex items-start gap-6">
                                    {/* Current Logo Preview */}
                                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
                                        {logoFile ? (
                                            <img
                                                src={URL.createObjectURL(logoFile)}
                                                alt="New Logo Preview"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        ) : settings.logo_url ? (
                                            <img
                                                src={settings.logo_url}
                                                alt="Current Logo"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No Logo</span>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="logo-upload"
                                            accept="image/*"
                                            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo-upload"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload New Logo
                                        </label>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Recommended size: 200x60px. PNG or SVG with transparent background works best.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Section Settings */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Homepage Hero</h2>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Main Wallpaper (Background)</label>

                                <div className="space-y-4">
                                    {/* Current Hero Preview */}
                                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border relative group">
                                        {heroBgFile ? (
                                            <img
                                                src={URL.createObjectURL(heroBgFile)}
                                                alt="New Hero Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : settings.hero_bg_url ? (
                                            <img
                                                src={settings.hero_bg_url}
                                                alt="Current Hero"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">No Wallpaper</div>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            id="hero-upload"
                                            accept="image/*"
                                            onChange={(e) => setHeroBgFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="hero-upload"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload New Wallpaper
                                        </label>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Recommended size: 1920x1080px. High quality JPG or WebP.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <>Saving...</>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Settings
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
