
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateEmbedCode, MapEmbedConfig, checkEmbedHealth } from '@/utils/embed-utils';
import EmbeddableMap from '@/components/EmbeddableMap';
import { MapPin, Copy, Code, Check, Info, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EmbedBuilder: React.FC = () => {
  const [config, setConfig] = useState<MapEmbedConfig>({
    height: "500px",
    width: "100%",
    showAttribution: true,
    showZoomControl: true,
    showResetView: true,
    showCategories: true,
    showLogo: true,
    mapStyle: "default",
    pinStyle: "modern"
  });
  const [copied, setCopied] = useState(false);
  const [testEmbedStatus, setTestEmbedStatus] = useState<'untested' | 'testing' | 'success' | 'failed'>('untested');
  
  const handleConfigChange = (key: keyof MapEmbedConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    // Reset embed test status when config changes
    if (testEmbedStatus !== 'untested') {
      setTestEmbedStatus('untested');
    }
  };
  
  const embedCode = generateEmbedCode(config);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The embed code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Test embed functionality by creating a temporary iframe
  const testEmbedFunctionality = () => {
    setTestEmbedStatus('testing');
    
    // Create a temporary container and iframe
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '500px';
    tempContainer.style.height = '500px';
    
    const tempIframe = document.createElement('iframe');
    tempIframe.id = 'test-embed-iframe';
    tempIframe.src = `${window.location.origin}/embed.html`;
    tempIframe.width = '100%';
    tempIframe.height = '100%';
    
    tempContainer.appendChild(tempIframe);
    document.body.appendChild(tempContainer);
    
    // Test iframe communication after a short delay
    setTimeout(async () => {
      try {
        const isHealthy = await checkEmbedHealth('test-embed-iframe');
        
        if (isHealthy) {
          setTestEmbedStatus('success');
          toast({
            title: "Embed test successful!",
            description: "The map embed is working correctly.",
          });
        } else {
          setTestEmbedStatus('failed');
          toast({
            title: "Embed test failed!",
            description: "The map embed is not responding properly.",
            variant: "destructive"
          });
        }
      } catch (error) {
        setTestEmbedStatus('failed');
        toast({
          title: "Embed test failed!",
          description: "Error testing embed functionality.",
          variant: "destructive"
        });
      } finally {
        // Clean up
        document.body.removeChild(tempContainer);
      }
    }, 3000);
  };
  
  // Update document title
  useEffect(() => {
    document.title = "Kefalonia Map Embed Builder";
    
    return () => {
      document.title = "Kefalonia Explorer";
    };
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Kefalonia Map Embed Builder</h1>
        <p className="text-muted-foreground">
          Customize your map and get the embed code to use on your own website.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Map Preview</CardTitle>
              </div>
              <CardDescription>
                This is how your map will look when embedded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: "500px", width: "100%" }}>
                <EmbeddableMap config={config} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Customize Your Map</CardTitle>
              <CardDescription>
                Adjust the settings and get the code to embed this map on your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="appearance" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="embed">Get Embed Code</TabsTrigger>
                </TabsList>
                
                <TabsContent value="appearance" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input 
                          id="height" 
                          value={config.height} 
                          onChange={(e) => handleConfigChange("height", e.target.value)}
                          placeholder="500px"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input 
                          id="width" 
                          value={config.width} 
                          onChange={(e) => handleConfigChange("width", e.target.value)}
                          placeholder="100%"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mapStyle">Map Style</Label>
                      <Select 
                        value={config.mapStyle} 
                        onValueChange={(value) => handleConfigChange("mapStyle", value)}
                      >
                        <SelectTrigger id="mapStyle">
                          <SelectValue placeholder="Select map style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="satellite">Satellite</SelectItem>
                          <SelectItem value="terrain">Terrain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pinStyle">Pin Style</Label>
                      <Select 
                        value={config.pinStyle} 
                        onValueChange={(value) => handleConfigChange("pinStyle", value)}
                      >
                        <SelectTrigger id="pinStyle">
                          <SelectValue placeholder="Select pin style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showCategories">Category Filters</Label>
                        <p className="text-sm text-muted-foreground">
                          Show category filter buttons above the map
                        </p>
                      </div>
                      <Switch 
                        id="showCategories" 
                        checked={config.showCategories}
                        onCheckedChange={(value) => handleConfigChange("showCategories", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showZoomControl">Zoom Controls</Label>
                        <p className="text-sm text-muted-foreground">
                          Show zoom in/out buttons on the map
                        </p>
                      </div>
                      <Switch 
                        id="showZoomControl" 
                        checked={config.showZoomControl}
                        onCheckedChange={(value) => handleConfigChange("showZoomControl", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showResetView">Reset View Button</Label>
                        <p className="text-sm text-muted-foreground">
                          Show button to reset the map view
                        </p>
                      </div>
                      <Switch 
                        id="showResetView" 
                        checked={config.showResetView}
                        onCheckedChange={(value) => handleConfigChange("showResetView", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showAttribution">Map Attribution</Label>
                        <p className="text-sm text-muted-foreground">
                          Show map attribution credits
                        </p>
                      </div>
                      <Switch 
                        id="showAttribution" 
                        checked={config.showAttribution}
                        onCheckedChange={(value) => handleConfigChange("showAttribution", value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showLogo">Kefalonia Explorer Logo</Label>
                        <p className="text-sm text-muted-foreground">
                          Show the Kefalonia Explorer logo on the map
                        </p>
                      </div>
                      <Switch 
                        id="showLogo" 
                        checked={config.showLogo}
                        onCheckedChange={(value) => handleConfigChange("showLogo", value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="embed" className="pt-4">
                  <div className="space-y-4">
                    <Alert variant="default" className="mb-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Embedding Instructions</AlertTitle>
                      <AlertDescription>
                        Copy the code below and paste it into your website's HTML. Make sure your website allows embedding from {window.location.origin}.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="embedCode">Embed Code</Label>
                        <div className="mt-2 relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-all">
                            {embedCode}
                          </pre>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button 
                          className="w-full"
                          onClick={copyToClipboard}
                          variant="default"
                        >
                          <Code className="mr-2 h-4 w-4" />
                          Copy Embed Code
                        </Button>
                        
                        <Button
                          className="w-full"
                          onClick={testEmbedFunctionality}
                          variant="secondary"
                          disabled={testEmbedStatus === 'testing'}
                        >
                          {testEmbedStatus === 'testing' ? (
                            <>
                              <div className="spinner mr-2"></div>
                              Testing...
                            </>
                          ) : testEmbedStatus === 'success' ? (
                            <>
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              Test Successful
                            </>
                          ) : testEmbedStatus === 'failed' ? (
                            <>
                              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                              Test Failed
                            </>
                          ) : (
                            <>
                              <Info className="mr-2 h-4 w-4" />
                              Test Embed
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {testEmbedStatus === 'failed' && (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Embed Test Failed</AlertTitle>
                          <AlertDescription>
                            The embed test failed. This might be due to CORS restrictions or server configuration issues. Make sure your server allows embedding from other domains.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="mt-4 text-sm text-muted-foreground">
                        <h3 className="font-medium mb-2">Troubleshooting Tips:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Make sure CORS is properly configured on your server</li>
                          <li>If using a CMS, check that it allows external iframes</li>
                          <li>Ensure the embed code is pasted exactly as provided</li>
                          <li>For WordPress sites, make sure to paste in the "Text" editor mode, not "Visual"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmbedBuilder;
