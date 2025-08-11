'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCopy, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

const ButtonShowcase = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const buttonVariants = [
    { name: 'Default', code: '<Button>Default</Button>' },
    { name: 'Primary', code: '<Button variant="default">Primary</Button>' },
    { name: 'Secondary', variant: 'secondary', code: '<Button variant="secondary">Secondary</Button>' },
    { name: 'Destructive', variant: 'destructive', code: '<Button variant="destructive">Destructive</Button>' },
    { name: 'Outline', variant: 'outline', code: '<Button variant="outline">Outline</Button>' },
    { name: 'Ghost', variant: 'ghost', code: '<Button variant="ghost">Ghost</Button>' },
    { name: 'Link', variant: 'link', code: '<Button variant="link">Link</Button>' },
  ];

  const buttonSizes = [
    { size: 'default', code: '<Button size="default">Default</Button>' },
    { size: 'sm', code: '<Button size="sm">Small</Button>' },
    { size: 'lg', code: '<Button size="lg">Large</Button>' },
    { size: 'icon', code: '<Button size="icon"><span>+</span></Button>' },
  ];

  const buttonStates = [
    { 
      name: 'Default', 
      code: '<Button>Default</Button>' 
    },
    { 
      name: 'Loading', 
      code: '<Button disabled>\n  <Loader2 className="mr-2 h-4 w-4 animate-spin" />\n  Loading...\n</Button>' 
    },
    { 
      name: 'Disabled', 
      code: '<Button disabled>Disabled</Button>' 
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Button Components</h1>
      
      <div className="space-y-4">
        <div className="flex space-x-2 mb-6">
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('variants')?.scrollIntoView()}
          >
            Variants
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('sizes')?.scrollIntoView()}
          >
            Sizes
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('states')?.scrollIntoView()}
          >
            States
          </Button>
        </div>

        <div id="variants" className="space-y-8 pt-8">
          <h2 className="text-2xl font-semibold">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buttonVariants.map((btn) => (
              <Card key={btn.name}>
                <CardHeader>
                  <CardTitle>{btn.name}</CardTitle>
                  <CardDescription>
                    <Button 
                      variant={btn.variant as any} 
                      className="mt-2"
                      onClick={() => copyToClipboard(btn.code)}
                    >
                      {copied === btn.code ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="mr-2 h-4 w-4" />
                          {btn.name}
                        </>
                      )}
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{btn.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div id="sizes" className="space-y-8 pt-8">
          <h2 className="text-2xl font-semibold">Button Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buttonSizes.map((btn) => (
              <Card key={btn.size}>
                <CardHeader>
                  <CardTitle className="capitalize">{btn.size} Size</CardTitle>
                  <CardDescription>
                    <Button 
                      size={btn.size as any}
                      variant="outline"
                      className="mt-2"
                      onClick={() => copyToClipboard(btn.code)}
                    >
                      {copied === btn.code ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="mr-2 h-4 w-4" />
                          {btn.size}
                        </>
                      )}
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{btn.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div id="states" className="space-y-8 pt-8">
          <h2 className="text-2xl font-semibold">Button States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buttonStates.map((btn) => (
              <Card key={btn.name}>
                <CardHeader>
                  <CardTitle>{btn.name}</CardTitle>
                  <CardDescription>
                    <Button 
                      variant="outline"
                      className="mt-2"
                      onClick={() => copyToClipboard(btn.code)}
                    >
                      {copied === btn.code ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="mr-2 h-4 w-4" />
                          {btn.name}
                        </>
                      )}
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{btn.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
