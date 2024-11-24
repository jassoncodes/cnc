FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5050
EXPOSE 5055

ENV ASPNETCORE_URLS=https://+:5055;http://+:5050
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=test
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx

VOLUME [ "/https" ]

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["src/CNC.Api/CNC.Api.csproj", "src/CNC.Api/"]
RUN dotnet restore "src/CNC.Api/CNC.Api.csproj"
COPY . .
WORKDIR "/src/src/CNC.Api"
RUN dotnet build "CNC.Api.csproj" -c $configuration -o /app/build


FROM build AS publish
ARG configuration=Release
RUN dotnet publish "CNC.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CNC.Api.dll"]
