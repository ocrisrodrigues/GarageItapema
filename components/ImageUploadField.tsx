import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  placeholder = "https://exemplo.com/imagem.jpg",
  required = false, 
  description 
}: ImageUploadFieldProps) {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (url: string) => {
    setPreviewUrl(url);
    onChange(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validação do tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validação do tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB.');
        return;
      }

      // Criar URL do arquivo para preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Converter para base64 para armazenar
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'url' | 'upload')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            URL da Web
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload de Arquivo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3">
          <Input
            type="url"
            value={uploadMethod === 'url' ? value : ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder={placeholder}
            required={required && uploadMethod === 'url'}
          />
          {description && uploadMethod === 'url' && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-3">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={openFileDialog}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Selecionar Arquivo
            </Button>
            <span className="text-sm text-muted-foreground">
              PNG, JPG ou JPEG (máx. 5MB)
            </span>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {uploadMethod === 'upload' && description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Preview da imagem */}
      {previewUrl && (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGM0Y1Ii8+CjxwYXRoIGQ9Ik0yNCAzMkwzMiA0MEw0OCAyNEw1NiA0OFYzMkg1NlYyNEgyNFYzMloiIGZpbGw9IiNDQkNFRDQiLz4KPC9zdmc+';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Imagem selecionada</p>
                    <p className="text-xs text-muted-foreground">
                      {uploadMethod === 'url' ? 'URL da web' : 'Arquivo carregado'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearImage}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder quando não há imagem */}
      {!previewUrl && (
        <Card className="border-dashed">
          <CardContent className="p-8">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Nenhuma imagem selecionada
              </p>
              <p className="text-xs text-muted-foreground">
                {description || "Selecione uma imagem usando uma das opções acima"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}